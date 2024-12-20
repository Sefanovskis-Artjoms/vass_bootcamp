import { signIn } from "@/auth";
import LoginForm from "../components/LoginForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const refresh = searchParams.refresh === "true";
  if (refresh) {
    return <meta httpEquiv="refresh" content="0; URL=/login" />;
  }

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
      console.error(`Failed to login: ${error}`);
      throw error;
    }
  }

  return <LoginForm onLoginAction={handleLogin} />;
}
