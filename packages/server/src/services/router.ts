import type { FastifyInstance, preHandlerAsyncHookHandler } from "fastify";
import type { Controller } from "./Controller";

export class Router {
  fastify: FastifyInstance;

  private constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  static async mount(fastify: FastifyInstance, prefix?: string) {
    const scopedFastify = await new Promise<FastifyInstance>((resolve) => {
      fastify
        .register(
          async (f) => {
            resolve(f);
          },
          { prefix },
        )
        .after();
    });
    fastify.log.debug(`registered router: ${prefix}`);
    return new Router(scopedFastify);
  }

  async registerController(controller: Controller) {
    for (const routeDef of controller.routeDefs) {
      await this.fastify[routeDef.method](routeDef.pathname, routeDef.handler.bind(this.fastify)).after();
      this.fastify.log.debug(
        `registered route: ${routeDef.method} ${routeDef.pathname} -> ${controller.constructor.name}.${routeDef.handler.name}`,
      );
    }
  }

  async registerMiddleware(middleware: preHandlerAsyncHookHandler) {
    await this.fastify.addHook("preHandler", middleware.bind(this.fastify)).after();
    this.fastify.log.debug(`registered middleware: ${middleware.name}`);
  }
}
