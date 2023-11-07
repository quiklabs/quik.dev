import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function isAuthenticated(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const user = request.session.get("user");
  if (!request.routerPath.includes("/auth") && !user) {
    return await reply.code(401).send({ message: "Not Authenticated" });
  }
}
