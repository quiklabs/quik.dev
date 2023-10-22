import { Router } from "../services/router";
import { Workspaces } from "../models";
import { GenericControllers } from "../services/controller";

import type { FastifyInstance } from "fastify";
import type { IWorkspace } from "../models";

export async function workspaceRoutes(fastify: FastifyInstance) {
  const workspaceController = new GenericControllers<IWorkspace>({ fastify, model: Workspaces });
  const router = new Router({ fastify });
  router.addRoute("get", "/:id", workspaceController.getById);
  router.addRoute("get", "/", workspaceController.getList);
}
