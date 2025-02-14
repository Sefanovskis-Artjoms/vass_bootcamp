import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "../../../models/groups-model";
import User from "../../../models/users-model";
import { IResponse, IGroup } from "@/types";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: groupId } = params;
    if (!groupId) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "id",
          message: "Group ID is required",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { userId } = await request.json();
    if (!userId) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "userId",
          message: "User ID is required",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ id: userId });
    if (!user) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "userId",
          message: "User not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const group = await Group.findOneAndUpdate(
      { id: groupId },
      { $addToSet: { users: [userId] } },
      { new: true }
    );
    if (!group) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "Group not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse<IGroup> = {
      success: true,
      data: group,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: groupId } = params;
    if (!groupId) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "id",
          message: "Group ID is required",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { userId } = await request.json();
    if (!userId) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "userId",
          message: "User ID is required",
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    await connectDB();

    const group = await Group.findOneAndUpdate(
      { id: groupId },
      { $pull: { users: userId } },
      { new: true }
    );
    if (!group) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "Group not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse<IGroup> = {
      success: true,
      data: group,
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
