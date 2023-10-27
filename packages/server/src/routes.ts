import { type FastifyInstance } from "fastify";
import { userRoutes } from "./controllers/users";
import { projectRoutes } from "./controllers/projects";
import { workspaceRoutes } from "./controllers/workspaces";

export async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(workspaceRoutes, { prefix: "/workspaces" });
  fastify.register(projectRoutes, { prefix: "/projects" });
  await fastify.after();
}
