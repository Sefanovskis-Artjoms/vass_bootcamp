import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "../../models/todos-model";
import { IResponse, ITodo } from "@/types";

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

    const result = await Todo.findOneAndDelete({ id: id });

    if (!result) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "Todo not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse = {
      success: true,
      data: "Todo deleted successfully",
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
  await connectDB();
  const { id } = params;

  try {
    const updatedTodoData: Partial<ITodo> = await request.json();

    const updatedTodo = await Todo.findOneAndUpdate(
      { id },
      { $set: updatedTodoData },
      { new: true }
    );

    if (!updatedTodo) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "To do not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse<ITodo> = {
      success: true,
      data: updatedTodo,
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

  try {
    const todo = await Todo.findOne({ id: id });

    if (!todo) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          message: "To do not found",
        },
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: IResponse<ITodo> = {
      success: true,
      data: todo,
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
