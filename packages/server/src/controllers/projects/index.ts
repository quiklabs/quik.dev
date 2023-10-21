import { type FastifyInstance } from "fastify";
import { getProjectRoute } from "./get-project";

export async function projectRoutes(fastify: FastifyInstance) {
  await fastify.register(getProjectRoute);
}
