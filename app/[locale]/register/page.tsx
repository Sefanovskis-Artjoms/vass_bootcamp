import RegisterForm from "./components/RegisterForm";
import { IResponse, IUser } from "@/types";
import dataservice from "@/services/dataService";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export default function LoginPage() {
  async function handleRegister(data: {
    name: string;
    surname: string;
    username: string;
    password: string;
    repeatPassword: string;
  }) {
    "use server";
    if (data.password !== data.repeatPassword) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "repeatPassword",
          message: "Passwords do not match",
        },
      };
      return response;
    }
    if (data.password.length < 6) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "password",
          message: "Password must be at least 6 characters long",
        },
      };
      return response;
    }
    const isUniqueResponse = await dataservice.isUsernameUnique(data.username);
    if (!isUniqueResponse.success) {
      return isUniqueResponse;
    }
    if (isUniqueResponse.data?.isUnique === false) {
      const response: IResponse = {
        success: false,
        error: {
          type: "FORM",
          field: "username",
          message: "Username is already taken",
        },
      };
      return response;
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser: IUser = {
      id: uuidv4(),
      username: data.username,
      name: data.name,
      surname: data.surname,
      password: hashedPassword,
      role: "User",
    };
    const addUserResponse = await dataservice.addUser(newUser);
    if (!addUserResponse.success) {
      return addUserResponse;
    }

    try {
      await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });
    } catch {
      const response: IResponse = {
        success: false,
        error: {
          type: "SERVER",
          message: "Failed to sign-in",
        },
      };
      return response;
    }
    revalidatePath("/");
    redirect("/");
  }

  return <RegisterForm onRegisterAction={handleRegister} />;
}
