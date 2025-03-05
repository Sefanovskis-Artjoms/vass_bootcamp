import Navigation from "../app/components/Navigation";
// import { auth } from "../auth";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../messages/en.json";
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
    // (auth as jest.Mock).mockResolvedValueOnce(null);
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Navigation />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("Log-in")).toBeInTheDocument();
  });
  // it("should render navigation for a user", () => {});
  // it("should render navigation for a manager", () => {});
  // it("should render navigation for an admin", () => {});
});
