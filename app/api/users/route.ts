"use server";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import User from "../models/usersModel";

export async function GET() {
  await connectDB();

  try {
    await User.findOne({ name: "John" }).then((res) => console.log(res));
    const users = await User.find({});
    return NextResponse.json({ data: users, success: "true" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch User" });
  }
}
