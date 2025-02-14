import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { IGroup, IResponse, ITodo } from "@/types";
import User from "../../../models/users-model";
import Todo from "../../../models/todos-model";
import Group from "@/app/api/models/groups-model";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
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
    if (user.role === "Admin" || user.role === "Manager") {
      const todos = await Todo.find({});
      const response: IResponse<ITodo[]> = {
        success: true,
        data: todos,
      };
      return NextResponse.json(response, { status: 200 });
    }

    const userTodos: ITodo[] = await Todo.find({
      "assignedTo.type": "user",
      "assignedTo.id": userId,
    });

    const groups: IGroup[] = await Group.find({ users: { $in: [userId] } });
    const groupIds: string[] = groups.map((group) => group.id);

    const groupTodos: ITodo[] = await Todo.find({
      "assignedTo.type": "group",
      "assignedTo.id": { $in: groupIds },
    });

    const allTodos: ITodo[] = [...userTodos, ...groupTodos];

    const response: IResponse<ITodo[]> = {
      success: true,
      data: allTodos,
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
