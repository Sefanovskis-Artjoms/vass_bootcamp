// app/api/tasks/route.ts
"use server";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Todos from "../models/taskModel";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("tasks");
//     const tasks = await db.collection("todos").find({}).toArray();
//     return NextResponse.json(tasks);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch tasks" },
//       { status: 500 }
//     );
//   }
// }
// req: unknown, res: unknown
export async function GET() {
  await connectDB();

  try {
    const todos = await Todos.find({});

    console.log("hi");
    return Response.json(todos);
  } catch (error) {
    return Response.json({ error: "Failed to fetch todos" });
  }
}
