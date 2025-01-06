import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "../models/todos-model";
import { IResponse, ITodo } from "@/types";

export async function GET() {
  await connectDB();

  try {
    const todos = await Todo.find({});
    const response: IResponse<ITodo[]> = {
      success: true,
      data: todos,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch Todos: ${error}`);
    const response: IResponse = {
      success: false,
      error: {
        type: "SERVER",
        message: "Failed to fetch Todos",
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const newTodo: ITodo = await request.json();
    const createdTodo = await Todo.create(newTodo);
    const response: IResponse<ITodo> = {
      success: true,
      data: createdTodo,
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: IResponse = {
      success: false,
      error: {
        type: "SERVER",
        message: "Failed to add Todo",
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
