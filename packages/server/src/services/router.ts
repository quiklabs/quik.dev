import type { FastifyInstance, RouteHandlerMethod } from "fastify";

type Methods = "get" | "head" | "post" | "put" | "delete" | "options" | "patch";

export const router = (method: Methods, path: string) => {
  return (handler: RouteHandlerMethod) => {
    return async function (fastify: FastifyInstance) {
      fastify.log.debug(`registering route [${method} ${fastify.prefix}${path}] -> ${handler.name}`);
      fastify[method](path, handler);
    };
  };
};
