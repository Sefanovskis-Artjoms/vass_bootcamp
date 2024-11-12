import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "../models/todos-model";
import { TodoCardInfo } from "@/types";

export async function GET() {
  await connectDB();

  try {
    const todos = await Todo.find({});
    return NextResponse.json({ data: todos }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to fetch Todos",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const newTodo: TodoCardInfo = await request.json();
    const createdTodo = await Todo.create(newTodo);
    return NextResponse.json({ data: createdTodo }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add Todo", success: false },
      { status: 500 }
    );
  }
}
