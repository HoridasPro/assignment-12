import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/actions/server/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await loginUser(credentials.email, credentials.password);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};
