import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
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
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/login`,
            {
              username,
              password,
            }
          );

          const user = res.data.user;

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
