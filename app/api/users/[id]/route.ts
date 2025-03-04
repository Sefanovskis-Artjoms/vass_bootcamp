import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../models/users-model";
import { IResponse, IUser } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "id",
          message: "ID is required",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ id: id });

    if (!user) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "User not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse<IUser> = {
      success: true,
      data: user,
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "id",
          message: "ID is required",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const body: Partial<IUser> = await request.json();

    if (Object.keys(body).length === 0) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "No data provided for update",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { id: id },
      { $set: body },
      { new: true }
    );

    if (!user) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "User not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse<IUser> = {
      success: true,
      data: user,
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
