import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

async function getUserFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    return decoded.id;
  } catch {
    return null;
  }
}

/* GET current user */
export async function GET(req: NextRequest) {
  await connectDB();

  const userId = await getUserFromToken(req);

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const user = await User.findById(userId).select("-password");

  return NextResponse.json({
    success: true,
    user,
  });
}

/* UPDATE profile */
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserFromToken(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...body, profileCompleted: true },
      { new: true },
    ).select("-password");

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
