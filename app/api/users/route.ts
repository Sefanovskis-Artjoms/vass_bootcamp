import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../models/users-model";
import { IResponse, IUser } from "@/types";

export async function GET() {
  await connectDB();
  try {
    const users = await User.find({});
    const response: IResponse<IUser[]> = {
      success: true,
      data: users,
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: IResponse = {
      success: false,
      error: {
        type: "SERVER",
        message: "Internal server error",
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const newUser: IUser = await request.json();
    const createdUser = await User.create(newUser);
    const response: IResponse<IUser> = {
      success: true,
      data: createdUser,
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: IResponse = {
      success: false,
      error: {
        type: "SERVER",
        message: "Failed to to create a new user",
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
