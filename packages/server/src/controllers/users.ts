import type { FastifyInstance } from "fastify";

import { router } from "../services/router";
import { Users } from "../services/db/models";

export async function getUserController() {
  const user = await Users.findOne({ fullname: "rudra" });
  return user;
}

export async function listUsersController() {
  const user = await Users.findAll();
  return user;
}

export const getUserRoute = router("get", "/:id")(getUserController);
export const listUsersRoute = router("get", "/")(listUsersController);

export async function userRoutes(fastify: FastifyInstance) {
  await fastify.register(getUserRoute);
  await fastify.register(listUsersRoute);
}
