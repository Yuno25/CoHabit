import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Questionnaire from "@/models/Questionnaire";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const data = await Questionnaire.findOneAndUpdate(
      { userId: user._id },
      {
        ...body,
        userId: user._id,
        username: user.username,
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const user = getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const data = await Questionnaire.findOne({ userId: user._id });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}
