import { type FastifyInstance } from "fastify";
import { getUserRoute } from "./get-user";

export async function userRoutes(fastify: FastifyInstance) {
  await fastify.register(getUserRoute);
}
