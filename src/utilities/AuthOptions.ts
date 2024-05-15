import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      // @ts-ignore
      async authorize(credentials, req) {
        // destructuring data
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          // Setting user object to return
          const response = await fetch(`${process.env.HOST}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
          });

          const res = await response.json();
          const user = res.user;

          // Returing
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
