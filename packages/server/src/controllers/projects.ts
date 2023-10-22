import { Router } from "../services/router";
import { Projects } from "../models";
import { GenericControllers } from "../services/controller";

import type { FastifyInstance } from "fastify";
import type { IProject } from "../models";

export async function projectRoutes(fastify: FastifyInstance) {
  const projectController = new GenericControllers<IProject>({ fastify, model: Projects });
  const router = new Router({ fastify });
  router.addRoute("get", "/:id", projectController.getById);
  router.addRoute("get", "/", projectController.getList);
}
