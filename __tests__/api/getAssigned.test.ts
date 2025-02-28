import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
// import { GET as getAssigned } from "@/app/api/todos/get-assigned/[userId]/route";
import User from "@/app/api/models/users-model";
import Todo from "@/app/api/models/todos-model";
import Group from "@/app/api/models/groups-model";
import { IResponse, ITodo } from "@/types";

function createFakeRequest() {
  return new Request("http://localhost/api/todos/get-assigned");
}

describe("GET /api/todos/get-assigned/[userId]/route", () => {
  let mongoServer: MongoMemoryServer;
  let getAssigned: typeof import("@/app/api/todos/get-assigned/[userId]/route").GET;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    // const uri = mongoServer.getUri();
    await mongoose.connect(process.env.MONGODB_URI);

    const module = await import("@/app/api/todos/get-assigned/[userId]/route");
    getAssigned = module.GET;

    await User.insertMany([
      {
        id: "admin1",
        username: "admin",
        name: "Admin",
        surname: "User",
        password: "pass",
        role: "Admin",
      },
      {
        id: "manager1",
        username: "manager1",
        name: "Manager",
        surname: "One",
        password: "pass",
        role: "Manager",
      },
      {
        id: "user1",
        username: "user1",
        name: "User",
        surname: "Two",
        password: "pass",
        role: "User",
      },
    ]);

    await Group.insertMany([
      {
        id: "group1",
        name: "Group 1",
        users: ["user1", "manager1"],
      },
      {
        id: "group2",
        name: "Group 2",
        users: ["manager1", "admin1"],
      },
    ]);

    await Todo.insertMany([
      {
        id: "todo1",
        title: "Todo 1",
        assignedTo: { type: "user", id: "user1" },
      },
      {
        id: "todo2",
        title: "Todo 2",
        assignedTo: { type: "user", id: "admin1" },
      },
      {
        id: "todo3",
        title: "Todo 3",
        assignedTo: { type: "user", id: "manager1" },
      },
      {
        id: "todo4",
        title: "Todo 4",
        assignedTo: { type: "user", id: "UNASSIGNED" },
      },
      {
        id: "todo5",
        title: "Todo 5",
        assignedTo: { type: "group", id: "group1" },
      },
      {
        id: "todo6",
        title: "Todo 6",
        assignedTo: { type: "group", id: "group2" },
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("should return same output for admin and manager", async () => {
    const managerResponse = await getAssigned(createFakeRequest(), {
      params: { userId: "manager1" },
    });
    const managerData: IResponse<ITodo[]> = await managerResponse.json();

    const adminResponse = await getAssigned(createFakeRequest(), {
      params: { userId: "admin1" },
    });
    const adminData: IResponse<ITodo[]> = await adminResponse.json();

    expect(managerData.success).toBe(true);
    expect(adminData.success).toBe(true);
    expect(managerData).toEqual(adminData);
  });

  it("should return all data for admin", async () => {
    const adminResponse = await getAssigned(createFakeRequest(), {
      params: { userId: "admin1" },
    });
    const adminData: IResponse<ITodo[]> = await adminResponse.json();

    expect(adminData.success).toBe(true);
    expect(adminData.data).toHaveLength(6);
  });

  it("should return only assigned todos for user", async () => {
    const userResponse = await getAssigned(createFakeRequest(), {
      params: { userId: "user1" },
    });
    const userData: IResponse<ITodo[]> = await userResponse.json();

    expect(userData.success).toBe(true);
    const ids: string[] | undefined = userData.data?.map((todo) => todo.id);
    expect(ids).toHaveLength(2);
    expect(ids).toEqual(["todo1", "todo5"]);
  });
});
