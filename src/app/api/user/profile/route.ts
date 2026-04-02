import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    // ✅ FIXED HERE
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const body = await req.json();

    // ✅ ALREADY CORRECT HERE
    const updatedUser = await User.findByIdAndUpdate(decoded.userId, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Profile update failed" },
      { status: 500 },
    );
  }
}
