import { type FastifyInstance } from "fastify";
import { userRoutes } from "./controllers/users";

export async function routes(fastify: FastifyInstance) {
  await fastify.register(userRoutes, { prefix: "/users" });
}
