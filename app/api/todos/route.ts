import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "../models/todos-model";
import { ITodo } from "@/types";

export async function GET() {
  await connectDB();

  try {
    const todos = await Todo.find({});
    return NextResponse.json({ data: todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to fetch Todos: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const newTodo: ITodo = await request.json();
    const createdTodo = await Todo.create(newTodo);
    return NextResponse.json({ data: createdTodo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to add Todo: ${error}`, success: false },
      { status: 500 }
    );
  }
}
