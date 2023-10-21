import { type FastifyInstance } from "fastify";
import { getWorkspaceRoute } from "./get-workspace";

export async function workspaceRoutes(fastify: FastifyInstance) {
  await fastify.register(getWorkspaceRoute);
}
