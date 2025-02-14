import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../models/users-model";
import { IResponse } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    if (!username) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "username",
          message: "Username is required",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ username });

    const isUnique = user ? false : true;

    const response: IResponse<{ isUnique: boolean }> = {
      success: true,
      data: { isUnique },
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: IResponse = {
      success: false,
      error: {
        type: "SERVER",
        message: "Internal Server Error",
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
