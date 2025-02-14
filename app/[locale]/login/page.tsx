import { signIn } from "@/auth";
import LoginForm from "./components/LoginForm";
import { AuthError } from "next-auth";
import { IResponse } from "@/types";

export default function LoginPage() {
  async function handleLogin(username: string, password: string) {
    "use server";
    try {
      await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      const response: IResponse = {
        success: true,
        data: null,
      };
      return response;
    } catch (error) {
      if (error instanceof AuthError && error.type === "CredentialsSignin") {
        const response: IResponse = {
          success: false,
          error: {
            type: "FORM",
            field: "password",
            message: "Invalid username or password",
          },
        };
        return response;
      }
      const response: IResponse = {
        success: false,
        error: {
          type: "SERVER",
          message: "Unexpected error occurred, please try again later",
        },
      };
      return response;
    }
  }

  return <LoginForm onLoginAction={handleLogin} />;
}
