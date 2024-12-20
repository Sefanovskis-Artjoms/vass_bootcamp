import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "../../models/todos-model";
import { IErrorDetail, ITodo } from "@/types";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      const errorResponse: IErrorDetail = {
        type: "FORM",
        field: "id",
        message: "ID is required",
      };
      return NextResponse.json({ error: errorResponse }, { status: 400 });
    }

    const result = await Todo.findOneAndDelete({ id: id });

    if (!result) {
      const errorResponse: IErrorDetail = {
        type: "FORM",
        message: "Todo not found",
      };
      return NextResponse.json({ error: errorResponse }, { status: 404 });
    }

    return NextResponse.json(
      {
        data: "Todo deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Failed to delete the todo: ${error}`);
    const errorResponse: IErrorDetail = {
      type: "SERVER",
      message: "Failed to delete the todo",
    };
    return NextResponse.json({ error: errorResponse }, { status: 500 });
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
      const errorResponse: IErrorDetail = {
        type: "FORM",
        message: "Todo not found",
      };
      return NextResponse.json({ error: errorResponse }, { status: 404 });
    }

    return NextResponse.json({ data: updatedTodo }, { status: 200 });
  } catch (error) {
    console.error(`Failed to update Todo: ${error}`);
    const errorResponse: IErrorDetail = {
      type: "SERVER",
      message: "Failed to update Todo",
    };
    return NextResponse.json({ error: errorResponse }, { status: 500 });
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
      const errorResponse: IErrorDetail = {
        type: "FORM",
        message: "Todo not found",
      };
      return NextResponse.json({ error: errorResponse }, { status: 404 });
    }

    return NextResponse.json({ data: todo }, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch Todo: ${error}`);
    const errorResponse: IErrorDetail = {
      type: "SERVER",
      message: "Failed to fetch Todo",
    };
    return NextResponse.json({ error: errorResponse }, { status: 500 });
  }
}
