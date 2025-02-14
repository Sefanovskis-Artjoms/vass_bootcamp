import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "../../models/groups-model";
import { IResponse, IGroup } from "@/types";

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

    const group = await Group.findOne({
      id: id,
    });

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

    const body: Partial<IGroup> = await request.json();

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

    const group = await Group.findOneAndUpdate(
      { id: id },
      { $set: body },
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
    await connectDB();

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

    const result = await Group.findOneAndDelete({ id: id });

    if (!result) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "Group not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse = {
      success: true,
      data: "Group deleted successfully",
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
