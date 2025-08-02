/**
 * @jest-environment node
 */

import { GET } from "../../app/api/todos/get-assigned/[userId]/route";
import Group from "../../app/api/models/groups-model";
import Todo from "../../app/api/models/todos-model";
import User from "../../app/api/models/users-model";
import { IResponse, ITodo, IUser, IGroup } from "@/types";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.mock("@/utils/mongodb", () => jest.fn());

describe("getAssigned API endpoint to get todos that are assigned to the user", () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);

    const users: IUser[] = [
      {
        id: "user1",
        username: "johndoe",
        name: "John",
        surname: "Doe",
        password: "pass",
        role: "User",
      },
      {
        id: "manager1",
        username: "manager",
        name: "Manager",
        surname: "One",
        password: "pass",
        role: "Manager",
      },
      {
        id: "admin1",
        username: "admin",
        name: "Admin",
        surname: "User",
        password: "pass",
        role: "Admin",
      },
    ];
    const groups: IGroup[] = [
      {
        id: "group1",
        name: "Group 1",
        users: ["user1", "manager1", "admin1"],
      },
      {
        id: "group2",
        name: "Group 2",
        users: ["admin1"],
      },
    ];
    const todos: ITodo[] = [
      {
        id: "todo1",
        status: "In progress",
        title: "Todo 1",
        description: "Desc 1",
        date: "14.01.2025.",
        type: "Bug",
        assignedTo: { type: "user", id: "user1" },
      },
      {
        id: "todo2",
        status: "In progress",
        title: "Todo 3",
        description: "Desc 3",
        date: "14.01.2025.",
        type: "Bug",
        assignedTo: { type: "user", id: "manager1" },
      },
      {
        id: "todo3",
        status: "In progress",
        title: "Todo 4",
        description: "Desc 4",
        date: "14.01.2025.",
        type: "Bug",
        assignedTo: { type: "user", id: "admin1" },
      },
      {
        id: "todo4",
        status: "In progress",
        title: "Todo 7",
        description: "Desc 7",
        date: "14.01.2025.",
        type: "Bug",
        assignedTo: { type: "user", id: "UNASSIGNED" },
      },
      {
        id: "todo5",
        status: "In progress",
        title: "Todo 5",
        description: "Desc 5",
        date: "14.01.2025.",
        type: "Bug",
        assignedTo: { type: "group", id: "group1" },
      },
      {
        id: "todo6",
        status: "In progress",
        title: "Todo 6",
        description: "Desc 6",
        date: "14.01.2025.",
        type: "Bug",
        assignedTo: { type: "group", id: "group2" },
      },
    ];

    await User.insertMany(users);
    await Group.insertMany(groups);
    await Todo.insertMany(todos);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it("should return all todos for admin", async () => {
    const request = new Request(
      "http://localhost/api/todos/get-assigned/admin1"
    );
    const resolvedRequest = await GET(request, {
      params: { userId: "admin1" },
    });
    expect(resolvedRequest.status).toBe(200);

    const response: IResponse<ITodo[]> = await resolvedRequest.json();
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(6);
  });

  it("should return all todos for manager", async () => {
    const request = new Request(
      "http://localhost/api/todos/get-assigned/manager1"
    );
    const resolvedRequest = await GET(request, {
      params: { userId: "manager1" },
    });
    expect(resolvedRequest.status).toBe(200);

    const response: IResponse<ITodo[]> = await resolvedRequest.json();
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(6);
  });

  it("should return only assigned todos for the user", async () => {
    const request = new Request(
      "http://localhost/api/todos/get-assigned/user1"
    );
    const resolvedRequest = await GET(request, {
      params: { userId: "user1" },
    });
    expect(resolvedRequest.status).toBe(200);

    const response: IResponse<ITodo[]> = await resolvedRequest.json();
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(2);
  });
});
