import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Questionnaire from "@/models/Questionnaire";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/* ─────────────────────────────────────────
   MATCH LOGIC
   For each numeric key in the 5 sections we compare
   primary's value vs other's value, then soften the
   diff using primary's *Tolerance for that key.

   Score per field  = max(0,  5 - diff + tolerance)  → 0‥5
   Section weight   = equal (each section counts the same)
   Final %          = weighted average across all fields × 100

   Additionally we check dealBreakers: if any of the
   other user's dealBreakers appear in primary's profile
   traits (derived from questionnaire values) we apply a
   5 % penalty per shared dealbreaker (capped at 25 %).
───────────────────────────────────────────*/

const SECTIONS = [
  "behavior",
  "cleanliness",
  "lifestyle",
  "sleep",
  "boundaries",
] as const;

function scoreSection(
  primary: any,
  other: any,
  section: string,
): { scored: number; max: number } {
  const p = primary?.[section] ?? {};
  const o = other?.[section] ?? {};
  const t = primary?.[section + "Tolerance"] ?? {};

  let scored = 0;
  let max = 0;

  // Union of all keys present in either user so we don't miss fields
  const keys = new Set([...Object.keys(p), ...Object.keys(o)]);

  for (const key of keys) {
    const pVal = typeof p[key] === "number" ? p[key] : 0;
    const oVal = typeof o[key] === "number" ? o[key] : 0;
    const tol = typeof t[key] === "number" ? t[key] : 0;

    const diff = Math.abs(pVal - oVal); // 0 – 5
    const raw = 5 - diff + tol; // higher tol = more forgiving
    const score = Math.max(0, Math.min(5, raw)); // clamp 0 – 5

    scored += score;
    max += 5;
  }

  return { scored, max };
}

function dealBreakerPenalty(primary: any, other: any): number {
  // Map questionnaire signals to readable trait strings
  // that might appear in the other user's dealBreakers array
  const primaryTraits: string[] = [];

  if ((primary?.cleanliness?.sharedCleaning ?? 5) < 2)
    primaryTraits.push("Unequal chores");
  if ((primary?.boundaries?.payments ?? 5) < 2)
    primaryTraits.push("Late payments");
  if ((primary?.lifestyle?.quietPreference ?? 5) < 2)
    primaryTraits.push("Noise issues");
  if ((primary?.boundaries?.sharingItems ?? 5) > 3)
    primaryTraits.push("Sharing items");
  if ((primary?.behavior?.privacyNeed ?? 0) > 3)
    primaryTraits.push("No privacy");

  const otherBreakers: string[] = other?.dealBreakers ?? [];
  const hits = otherBreakers.filter((db) =>
    primaryTraits.some((t) => t.toLowerCase() === db.toLowerCase()),
  ).length;

  // 5 % penalty per hit, max 25 %
  return Math.min(hits * 5, 25);
}

function calculateMatch(primary: any, other: any): number {
  let totalScored = 0;
  let totalMax = 0;

  for (const section of SECTIONS) {
    const { scored, max } = scoreSection(primary, other, section);
    totalScored += scored;
    totalMax += max;
  }

  if (totalMax === 0) return 0;

  const basePercent = Math.round((totalScored / totalMax) * 100);
  const penalty = dealBreakerPenalty(primary, other);

  return Math.max(0, basePercent - penalty);
}

/* ─────────────────────────────────────────
   ROUTE
───────────────────────────────────────────*/

export async function GET() {
  try {
    await connectDB();

    /* AUTH */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId.toString();

    console.log("PRIMARY USER ID:", userId);

    /* PRIMARY USER QUESTIONNAIRE */
    const primary = await Questionnaire.findOne({ userId });

    if (!primary) {
      return NextResponse.json({
        success: true,
        matches: [],
        message: "Primary questionnaire not found",
      });
    }

    /* OTHER USERS' QUESTIONNAIRES */
    const others = await Questionnaire.find({ userId: { $ne: userId } });

    console.log(
      "OTHER USERS:",
      others.map((o) => o.userId),
    );

    if (!others.length) {
      return NextResponse.json({
        success: true,
        matches: [],
        message: "No other users found",
      });
    }

    /* USER MAP (for profile data) */
    const users = await User.find();
    const usersMap = new Map<string, any>();
    users.forEach((u: any) => usersMap.set(u._id.toString(), u));

    /* CALCULATE & SORT */
    const matches = others.map((other: any) => {
      const matchPct = calculateMatch(primary.toObject(), other.toObject());
      const user = usersMap.get(other.userId.toString());

      return {
        userId: other.userId,
        name: user?.name || "User",
        age: user?.age || null,
        gender: user?.gender || null,
        city: user?.city || null,
        locality: user?.locality || null,
        bio: user?.bio || null,
        smoking: user?.smoking || null,
        drinking: user?.drinking || null,
        pets: user?.pets || null,
        sleepSchedule: user?.sleepSchedule || null,
        cleanliness: user?.cleanliness || null,
        match: matchPct,
      };
    });

    matches.sort((a, b) => b.match - a.match);

    console.log("MATCHES:", matches);

    return NextResponse.json({ success: true, matches });
  } catch (err) {
    console.error("MATCH ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
