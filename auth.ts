import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "./app/api/models/users-model";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

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
        const user = await User.findOne({ username });
        if (!user) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return { id: user.id };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
