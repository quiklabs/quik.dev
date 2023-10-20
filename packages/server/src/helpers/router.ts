import { type FastifyInstance, type RouteHandlerMethod } from "fastify";

type Methods = "get" | "head" | "post" | "put" | "delete" | "options" | "patch";

export const router = (method: Methods, path: string) => {
  return (handler: RouteHandlerMethod) => {
    return async function (fastify: FastifyInstance) {
      fastify.log.info(`Registering route [${method} ${path}] -> ${handler.name}`);
      fastify[method](path, handler);
    };
  };
};
