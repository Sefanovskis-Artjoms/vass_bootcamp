import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../models/users-model";
import { IErrorDetail } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      const errorResponse: IErrorDetail = {
        type: "FORM",
        field: "id",
        message: "ID is required",
      };
      return NextResponse.json({ error: errorResponse }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ id: id });

    if (!user) {
      const errorResponse: IErrorDetail = {
        type: "FORM",
        message: "User not found",
      };
      return NextResponse.json({ error: errorResponse }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    const errorResponse: IErrorDetail = {
      type: "SERVER",
      message: "Internal Server Error",
    };
    return NextResponse.json({ error: errorResponse }, { status: 500 });
  }
}
