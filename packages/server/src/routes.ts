import { type FastifyInstance } from "fastify";
import { userRoutes } from "./controllers/users";
import { projectRoutes } from "./controllers/projects";
import { workspaceRoutes } from "./controllers/workspaces";

export async function routes(fastify: FastifyInstance) {
  await fastify.register(userRoutes, { prefix: "/users" });
  await fastify.register(workspaceRoutes, { prefix: "/workspaces" });
  await fastify.register(projectRoutes, { prefix: "/projects" });
}
