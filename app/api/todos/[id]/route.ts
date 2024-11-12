import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "../../models/todos-model";
import { TodoCardInfo } from "@/types";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await Todo.findOneAndDelete({ id: id });

    if (!result) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Todo deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete the todo: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const updatedTodoData: Partial<TodoCardInfo> = await request.json();

    const updatedTodo = await Todo.findOneAndUpdate(
      { id },
      { $set: updatedTodoData },
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedTodo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update Todo: ${(error as Error).message}` },
      { status: 500 }
    );
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
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ data: todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch Todo: ${error}` },
      { status: 500 }
    );
  }
}
