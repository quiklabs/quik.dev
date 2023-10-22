import { Router } from "../services/router";
import { Users } from "../models";
import { GenericControllers } from "../services/controller";

import type { FastifyInstance } from "fastify";
import type { IUser } from "../models";

export async function userRoutes(fastify: FastifyInstance) {
  const userControllers = new GenericControllers<IUser>({ fastify, model: Users });
  const router = new Router({ fastify });
  router.addRoute("get", "/:id", userControllers.getById);
  router.addRoute("get", "/", userControllers.getList);
}
