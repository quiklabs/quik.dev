import type { IUser } from "./models";

declare module "fastify" {
  interface Session {
    user: IUser;
  }
}

export {};
