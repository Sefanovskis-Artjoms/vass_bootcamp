import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../models/users-model";
import { IErrorDetail } from "@/types";

export async function GET() {
  await connectDB();

  try {
    const users = await User.find({});
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch Users: ${error}`);
    const errorResponse: IErrorDetail = {
      type: "SERVER",
      message: "Internal Server Error",
    };
    return NextResponse.json({ error: errorResponse }, { status: 500 });
  }
}
