import type { FastifyInstance, RouteHandlerMethod } from "fastify";

type Methods = "get" | "head" | "post" | "put" | "delete" | "options" | "patch";

interface IRouterConstructorArgs {
  fastify: FastifyInstance;
}
export class Router {
  fastify;

  constructor({ fastify }: IRouterConstructorArgs) {
    this.fastify = fastify;
  }

  addRoute(method: Methods, path: string, controller: RouteHandlerMethod) {
    this.fastify.log.debug(`registering route [${method}] ${this.fastify.prefix}${path}`);
    this.fastify[method](path, controller);
  }
}
