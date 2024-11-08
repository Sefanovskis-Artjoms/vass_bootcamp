"use server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Todo from "../models/todos-model";

export async function GET() {
  await connectDB();

  try {
    const todos = await Todo.find({});
    return NextResponse.json({ data: todos, success: "true" });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Todos" });
  }
}
