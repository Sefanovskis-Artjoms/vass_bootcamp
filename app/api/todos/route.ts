"use server";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Todo from "../models/todosModel";

export async function GET() {
  await connectDB();

  try {
    const todos = await Todo.find({});
    return NextResponse.json({ data: todos, success: "true" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Todos" });
  }
}
