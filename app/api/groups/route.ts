import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "../models/groups-model";
import { IResponse, IGroup } from "@/types";

export async function GET() {
  await connectDB();
  try {
    const groups = await Group.find({});
    const response: IResponse<IGroup[]> = {
      success: true,
      data: groups,
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

export async function POST(request: Request) {
  await connectDB();

  try {
    const newGroup: IGroup = await request.json();
    const createdGroup = await Group.create(newGroup);
    const response: IResponse<IGroup> = {
      success: true,
      data: createdGroup,
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: IResponse = {
      success: false,
      error: {
        type: "SERVER",
        message: "Failed to to create a new group",
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
