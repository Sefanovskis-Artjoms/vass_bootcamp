import TodoCard from "../app/components/TodoCard";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../messages/en.json";
import * as nextRouter from "next/router";

describe("TodoCard component", () => {
  beforeAll(() => {
    const useRouter = jest.spyOn(nextRouter, "useRouter");

    useRouter.mockImplementation(
      () =>
        ({
          query: { locale: "en" },
        } as unknown as nextRouter.NextRouter)
    );
  });

  const testTodo = {
    id: "1",
    status: "In progress",
    type: "Bug",
    title: "Test Todo",
    date: "14.01.2025.",
    description: "This is a test description",
    assignedTo: {
      type: "User",
      id: "1",
    },
  };

  it("should render todo card WITHOUT delete button", () => {
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <TodoCard information={testTodo} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("In progress")).toBeInTheDocument();
    expect(screen.getByText("Bug")).toBeInTheDocument();
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText(/14\.01\.2025\./)).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
    expect(screen.queryByText("Delete")).toBeNull();
  });

  it("should render todo card WITH a delete button", () => {
    const handleDelete = jest.fn();
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <TodoCard information={testTodo} deleteTodoAction={handleDelete} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("In progress")).toBeInTheDocument();
    expect(screen.getByText("Bug")).toBeInTheDocument();
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText(/14\.01\.2025\./)).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should display message when deletion is unsuccessful", async () => {
    const handleDelete = jest.fn();
    handleDelete.mockReturnValueOnce({
      success: false,
      error: { message: "Internal server error" },
    });
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <TodoCard information={testTodo} deleteTodoAction={handleDelete} />
      </NextIntlClientProvider>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/Internal server error/)).toBeInTheDocument();
    });
  });
});
