import type { FastifyInstance, RouteHandlerMethod } from "fastify";
import type { TRouteMethods } from "./Router";

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
          console.log("called", method, pathname);
          this.routeDefs.push({ method, pathname, handler: target });
        });
      }
    };
  }

  load(fastify: FastifyInstance) {
    for (const routeDef of this.routeDefs) {
      fastify[routeDef.method](routeDef.pathname, routeDef.handler);
    }
  }
}
