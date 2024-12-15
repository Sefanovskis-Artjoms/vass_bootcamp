import { signIn } from "@/auth";
import LoginForm from "../components/LoginForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function handleLogin(username: string, password: string) {
    "use server";
    try {
      await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      revalidatePath("/");
      redirect("/");
    } catch (error) {
      throw error;
    }
  }

  return <LoginForm onLoginAction={handleLogin} />;
}
