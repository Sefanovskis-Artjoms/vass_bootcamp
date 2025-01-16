import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "./app/api/models/users-model";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { IUser } from "./types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    };
  }

  interface JWT {
    id: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const username: string = credentials.username as string;
        const password: string = credentials.password as string;
        if (!username || !password) {
          return null;
        }
        await connectDB();
        const user: IUser | null = await User.findOne({ username });
        if (!user || !user.password) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return { id: user.id, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      const userData = user as IUser;
      if (user) {
        token.id = userData.id;
        token.role = userData.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
});
