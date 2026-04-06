import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Questionnaire from "@/models/Questionnaire";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const SECTIONS = [
  "behavior",
  "cleanliness",
  "lifestyle",
  "sleep",
  "boundaries",
] as const;

/* ─────────────────────────────────────────
   SCORE ONE SECTION
───────────────────────────────────────────*/

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

  const keys = new Set([...Object.keys(p), ...Object.keys(o)]);

  for (const key of keys) {
    const pVal = typeof p[key] === "number" ? p[key] : 0;
    const oVal = typeof o[key] === "number" ? o[key] : 0;
    const tol = typeof t[key] === "number" ? t[key] : 0;

    const diff = Math.abs(pVal - oVal);
    const raw = 5 - diff + tol;
    const score = Math.max(0, Math.min(5, raw));

    scored += score;
    max += 5;
  }

  return { scored, max };
}

/* ─────────────────────────────────────────
   DEALBREAKER CONFLICT COUNT

   Checks how many of the primary user's dealbreakers
   are present ("Yes") in the other user's profile.

   Returns:
     count       — number of conflicts (shown in UI note)
     conflictList — which specific dealbreakers matched
                    (e.g. ["Smoking", "Alcohol"])

   Dealbreaker string → profile / questionnaire mapping
   (all comparisons case-insensitive):

   "smoking"          → otherUser.smoking === "yes"
   "alcohol"          → otherUser.drinking === "yes"
   "drinking"         → otherUser.drinking === "yes"
   "pets"             → otherUser.pets === "yes"
   "frequent guests"  → questionnaire boundaries.guests > 3
   "overnight guests" → questionnaire boundaries.overnightGuests > 2
   "poor hygiene"     → questionnaire cleanliness.personalCleaning < 2
   "unequal chores"   → questionnaire cleanliness.sharedCleaning < 2
   "no privacy"       → questionnaire behavior.privacyNeed < 2
   "space domination" → questionnaire boundaries.spaceUsage > 3
   "noise at night"   → questionnaire sleep.lateNightActivity > 3
   "late payments"    → questionnaire boundaries.payments < 2
   "sharing items"    → questionnaire boundaries.sharingItems > 3
───────────────────────────────────────────*/

function getDealBreakerConflicts(
  primaryDealBreakers: string[],
  otherUser: any,
  otherQ: any,
): { count: number; conflictList: string[] } {
  const conflictList: string[] = [];

  const breakers = primaryDealBreakers.map((d) => d.toLowerCase().trim());
  const has = (keyword: string) => breakers.includes(keyword);

  const otherSmoking = otherUser?.smoking?.toLowerCase().trim();
  const otherDrinking = otherUser?.drinking?.toLowerCase().trim();
  const otherPets = otherUser?.pets?.toLowerCase().trim();

  if (has("smoking") && otherSmoking === "yes") conflictList.push("Smoking");
  if ((has("alcohol") || has("drinking")) && otherDrinking === "yes")
    conflictList.push("Alcohol");
  if (has("pets") && otherPets === "yes") conflictList.push("Pets");
  if (has("frequent guests") && (otherQ?.boundaries?.guests ?? 0) > 3)
    conflictList.push("Frequent guests");
  if (has("overnight guests") && (otherQ?.boundaries?.overnightGuests ?? 0) > 2)
    conflictList.push("Overnight guests");
  if (has("poor hygiene") && (otherQ?.cleanliness?.personalCleaning ?? 5) < 2)
    conflictList.push("Poor hygiene");
  if (has("unequal chores") && (otherQ?.cleanliness?.sharedCleaning ?? 5) < 2)
    conflictList.push("Unequal chores");
  if (has("no privacy") && (otherQ?.behavior?.privacyNeed ?? 5) < 2)
    conflictList.push("No privacy");
  if (has("space domination") && (otherQ?.boundaries?.spaceUsage ?? 0) > 3)
    conflictList.push("Space domination");
  if (has("noise at night") && (otherQ?.sleep?.lateNightActivity ?? 0) > 3)
    conflictList.push("Noise at night");
  if (has("late payments") && (otherQ?.boundaries?.payments ?? 5) < 2)
    conflictList.push("Late payments");
  if (has("sharing items") && (otherQ?.boundaries?.sharingItems ?? 0) > 3)
    conflictList.push("Sharing items");

  return { count: conflictList.length, conflictList };
}

/* ─────────────────────────────────────────
   CALCULATE MATCH %
   
   Base score from questionnaire sections +
   -5% per dealbreaker conflict (no cap —
   each conflict genuinely reduces compatibility)
───────────────────────────────────────────*/

function calculateMatch(
  primary: any,
  other: any,
  conflictCount: number,
): number {
  let totalScored = 0;
  let totalMax = 0;

  for (const section of SECTIONS) {
    const { scored, max } = scoreSection(primary, other, section);
    totalScored += scored;
    totalMax += max;
  }

  if (totalMax === 0) return 0;

  const basePercent = Math.round((totalScored / totalMax) * 100);
  const penalty = conflictCount * 5;

  return Math.max(0, basePercent - penalty);
}

/* ─────────────────────────────────────────
   ROUTE
───────────────────────────────────────────*/

export async function GET() {
  try {
    await connectDB();

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

    const primary = await Questionnaire.findOne({ userId });

    if (!primary) {
      return NextResponse.json({
        success: true,
        matches: [],
        message: "Primary questionnaire not found",
      });
    }

    const primaryObj = primary.toObject();
    const primaryDealBreakers: string[] = primaryObj?.dealBreakers ?? [];

    console.log("PRIMARY DEALBREAKERS:", primaryDealBreakers);

    const others = await Questionnaire.find({ userId: { $ne: userId } });

    if (!others.length) {
      return NextResponse.json({
        success: true,
        matches: [],
        message: "No other users found",
      });
    }

    const users = await User.find();
    const usersMap = new Map<string, any>();
    users.forEach((u: any) => usersMap.set(u._id.toString(), u));

    const matches: any[] = [];

    for (const other of others) {
      const otherObj = other.toObject();
      const otherUser = usersMap.get(other.userId.toString());

      // Get conflict count + list for this user
      const { count: conflictCount, conflictList } = getDealBreakerConflicts(
        primaryDealBreakers,
        otherUser,
        otherObj,
      );

      const matchPct = calculateMatch(primaryObj, otherObj, conflictCount);

      console.log(
        `${otherUser?.name} → match: ${matchPct}%, conflicts: ${conflictList}`,
      );

      matches.push({
        userId: other.userId,
        name: otherUser?.name || "User",
        age: otherUser?.age || null,
        gender: otherUser?.gender || null,
        city: otherUser?.city || null,
        locality: otherUser?.locality || null,
        bio: otherUser?.bio || null,
        smoking: otherUser?.smoking || null,
        drinking: otherUser?.drinking || null,
        pets: otherUser?.pets || null,
        sleepSchedule: otherUser?.sleepSchedule || null,
        cleanliness: otherUser?.cleanliness || null,
        match: matchPct,
        conflictCount,
        conflictList, // e.g. ["Smoking", "Alcohol"]
      });
    }

    matches.sort((a, b) => b.match - a.match);

    return NextResponse.json({ success: true, matches });
  } catch (err) {
    console.error("MATCH ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
