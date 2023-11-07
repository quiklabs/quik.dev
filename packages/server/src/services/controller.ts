import type { FastifyInstance, RouteHandlerMethod } from "fastify";

export type TRouteMethods = "get" | "head" | "post" | "put" | "delete" | "options" | "patch";

interface TRouteDef {
  method: TRouteMethods;
  pathname: string;
  handler: RouteHandlerMethod;
}

export class Controller {
  routeDefs: TRouteDef[] = [];

  static route<This extends Controller>(method: TRouteMethods, pathname: string) {
    return (target: RouteHandlerMethod, context: ClassMethodDecoratorContext<This>) => {
      if (context.kind === "method") {
        context.addInitializer(function (this: This) {
          this.routeDefs.push({ method, pathname, handler: target });
        });
      }
    };
  }

  async mount(fastify: FastifyInstance) {
    for (const routeDef of this.routeDefs) {
      await fastify[routeDef.method](routeDef.pathname, routeDef.handler.bind(fastify)).after();
    }
  }
}
