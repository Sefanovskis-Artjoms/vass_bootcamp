import TodoDetails from "@/app/components/TodoDetails";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IGroup, ITodo, IUser } from "@/types";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn().mockReturnValue((key: string) => key),
}));

describe("TodoDetails component", () => {
  const testTodo = {
    id: "1",
    status: "In progress",
    type: "Bug",
    title: "Test Todo",
    date: "14.01.2025.",
    description: "This is a test description",
    assignedTo: {
      type: "user",
      id: "1",
    },
  };
  const testUserData: IUser[] = [
    {
      id: "1",
      username: "johndoe",
      name: "John",
      surname: "Doe",
      role: "User",
    },
    {
      id: "2",
      username: "janedoe",
      name: "Jane",
      surname: "Doe",
      role: "User",
    },
  ];
  const testGroupData: IGroup[] = [
    {
      id: "1",
      name: "Group 1",
      users: ["1", "2"],
    },
    {
      id: "2",
      name: "Group 2",
      users: ["1"],
    },
  ];

  it("should render todo details user view with no editing options", () => {
    const userRole = "User";
    render(
      <TodoDetails
        information={testTodo}
        userRole={userRole}
        userData={testUserData}
        groupData={testGroupData}
      />
    );

    expect(screen.getByText(/In progress/)).toBeInTheDocument();
    expect(screen.getByText(/Bug/)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo/)).toBeInTheDocument();
    expect(screen.getByText(/14\.01\.2025\./)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe \(johndoe\)/)).toBeInTheDocument();
    expect(screen.queryByText(/Edit/)).toBeNull();
  });
  it("should render todo details manager view with editing option", () => {
    const userRole = "Manager";
    render(
      <TodoDetails
        information={testTodo}
        userRole={userRole}
        userData={testUserData}
        groupData={testGroupData}
        onEditAction={jest
          .fn()
          .mockResolvedValue({ success: true, data: {} as ITodo })}
      />
    );

    expect(screen.getByText(/In progress/)).toBeInTheDocument();
    expect(screen.getByText(/Bug/)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo/)).toBeInTheDocument();
    expect(screen.getByText(/14\.01\.2025\./)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe \(johndoe\)/)).toBeInTheDocument();
    expect(screen.getByText(/Edit/)).toBeInTheDocument();
  });
  it("should render todo details admin view with editing option", () => {
    const userRole = "Admin";
    render(
      <TodoDetails
        information={testTodo}
        userRole={userRole}
        userData={testUserData}
        groupData={testGroupData}
        onEditAction={jest.fn().mockResolvedValue({})}
      />
    );

    expect(screen.getByText(/In progress/)).toBeInTheDocument();
    expect(screen.getByText(/Bug/)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo/)).toBeInTheDocument();
    expect(screen.getByText(/14\.01\.2025\./)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe \(johndoe\)/)).toBeInTheDocument();
    expect(screen.getByText(/Edit/)).toBeInTheDocument();
  });

  it("should let manager edit only assigned to field", async () => {
    render(
      <TodoDetails
        information={testTodo}
        userRole="Manager"
        userData={testUserData}
        groupData={testGroupData}
        onEditAction={jest.fn().mockResolvedValue({})}
      />
    );

    const editButton = screen.getByText(/Edit/);
    expect(editButton).toBeInTheDocument();

    await userEvent.click(editButton);

    expect(screen.getByText(/14\.01\.2025\./)).toBeInTheDocument();
    expect(screen.getByText(/Save/)).toBeInTheDocument();

    expect(screen.getByText(/John Doe \(johndoe\)/)).toBeInstanceOf(
      HTMLOptionElement
    );
    expect(screen.getByText(/Bug/)).toBeInstanceOf(HTMLDivElement);
    expect(screen.getByText(/In progress/)).toBeInstanceOf(HTMLDivElement);
    expect(screen.getByText(/Test Todo/)).toBeInstanceOf(HTMLSpanElement);
    expect(screen.getByText(/This is a test description/)).toBeInstanceOf(
      HTMLDivElement
    );
  });

  it("should let admin edit everything", async () => {
    render(
      <TodoDetails
        information={testTodo}
        userRole="Admin"
        userData={testUserData}
        groupData={testGroupData}
        onEditAction={jest.fn().mockResolvedValue({})}
      />
    );

    const editButton = screen.getByText(/Edit/);
    expect(editButton).toBeInTheDocument();

    await userEvent.click(editButton);

    expect(screen.getByText(/14\.01\.2025\./)).toBeInTheDocument();
    expect(screen.getByText(/Save/)).toBeInTheDocument();

    expect(screen.getByText(/John Doe \(johndoe\)/)).toBeInstanceOf(
      HTMLOptionElement
    );
    expect(screen.getByText(/Bug/)).toBeInstanceOf(HTMLOptionElement);
    expect(screen.getByText(/In progress/)).toBeInstanceOf(HTMLOptionElement);

    // Had to leave testid selector because for input fields because it didnt "show on the screen" its value
    expect(screen.getByTestId("title-input")).toBeInTheDocument();
    expect(screen.getByTestId("description-input")).toBeInTheDocument();
  });
});
