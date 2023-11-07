import type { FastifyInstance, RouteHandlerMethod } from "fastify";
import type { Controller } from "./Controller";

export type TRouteMethods = "get" | "head" | "post" | "put" | "delete" | "options" | "patch";

interface IRouterConstructorArgs {
  fastify: FastifyInstance;
}
export class Router {
  fastify;

  constructor({ fastify }: IRouterConstructorArgs) {
    this.fastify = fastify;
  }

  addRoute(method: TRouteMethods, path: string, controller: RouteHandlerMethod) {
    this.fastify.log.debug(`registering route [${method}] ${this.fastify.prefix}${path}`);
    this.fastify[method](path, controller);
  }

  register(prefix: string, controller: Controller) {
    return this.fastify
      .register(
        async (fastify) => {
          controller.load(fastify);
        },
        { prefix },
      )
      .after();
  }
}
