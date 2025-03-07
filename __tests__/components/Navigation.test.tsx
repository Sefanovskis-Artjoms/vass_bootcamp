import Navigation from "../../app/components/Navigation";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../messages/en.json";
import * as nextRouter from "next/router";

describe("Navigation component", () => {
  beforeAll(() => {
    const useRouter = jest.spyOn(nextRouter, "useRouter");
    useRouter.mockImplementation(
      () =>
        ({
          query: { locale: "en" },
        } as unknown as nextRouter.NextRouter)
    );
  });

  it("should render navigation without a session", () => {
    // I want to keep this approach of handling next-intl translations as well
    // as just a reminder, maybe in the futere it might me usefull
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Navigation isLoggedIn={false} user={null} signOut={jest.fn} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/Log-in/)).toBeInTheDocument();
    expect(screen.queryByText(/To do list/)).toBeNull();
    expect(screen.queryByText(/Add to do item/)).toBeNull();
    expect(screen.queryByText(/View all users/)).toBeNull();
    expect(screen.queryByText(/View groups/)).toBeNull();
    expect(screen.queryByText(/Log-out/)).toBeNull();
  });
  it("should render navigation for a user", () => {
    const user = {
      id: "1",
      username: "johndoe",
      name: "John",
      surname: "Doe",
      role: "User",
    };
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Navigation isLoggedIn={true} user={user} signOut={jest.fn} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/To do list/)).toBeInTheDocument();
    expect(screen.getByText(/Log-out/)).toBeInTheDocument();
    expect(screen.getByText(/Hi John Doe/)).toBeInTheDocument();
    expect(screen.queryByText(/Log-in/)).toBeNull();
    expect(screen.queryByText(/Add to do item/)).toBeNull();
    expect(screen.queryByText(/View all users/)).toBeNull();
    expect(screen.queryByText(/View groups/)).toBeNull();
  });

  // This test is identical to previous one(user navigation), but still is present because
  // something in future can change and it will be easier to modify existing test
  it("should render navigation for a manager", () => {
    const user = {
      id: "1",
      username: "johndoe",
      name: "John",
      surname: "Doe",
      role: "Manager",
    };
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Navigation isLoggedIn={true} user={user} signOut={jest.fn} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/To do list/)).toBeInTheDocument();
    expect(screen.getByText(/Log-out/)).toBeInTheDocument();
    expect(screen.getByText(/Hi John Doe/)).toBeInTheDocument();
    expect(screen.queryByText(/Log-in/)).toBeNull();
    expect(screen.queryByText(/Add to do item/)).toBeNull();
    expect(screen.queryByText(/View all users/)).toBeNull();
    expect(screen.queryByText(/View groups/)).toBeNull();
  });
  it("should render navigation for an admin", () => {
    const user = {
      id: "1",
      username: "johndoe",
      name: "John",
      surname: "Doe",
      role: "Admin",
    };
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Navigation isLoggedIn={true} user={user} signOut={jest.fn} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/To do list/)).toBeInTheDocument();
    expect(screen.getByText(/Log-out/)).toBeInTheDocument();
    expect(screen.getByText(/Hi John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Add to do item/)).toBeInTheDocument();
    expect(screen.getByText(/View all users/)).toBeInTheDocument();
    expect(screen.getByText(/View groups/)).toBeInTheDocument();
    expect(screen.queryByText(/Log-in/)).toBeNull();
  });
});
