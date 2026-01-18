import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  return NextResponse.json({
    success: true,
    message: "User profile route working",
  });
}
