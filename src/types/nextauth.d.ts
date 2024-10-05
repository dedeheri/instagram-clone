import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      fullname?: string | null;
      username?: string | null;
      bio?: string | null;
    } & DefaultSession["user"];
  }
}
