import "dotenv/config";
import type { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import Fastify from "fastify";
import { UserController } from "./controllers/UserController";
import { Router } from "./services/Router";
import { AuthController } from "./controllers/AuthController";
import { WorkspaceController } from "./controllers/WorkspaceController";
import { ProjectController } from "./controllers/ProjectController";
import { isAuthenticated } from "./middlewares/is-authenticated";

class Server {
  port: number;
  fastify: FastifyInstance;
  router?: Router;

  constructor() {
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.fastify = Fastify({ logger: { level: "debug" } });
  }

  async initialize() {
    this.router = await Router.mount(this.fastify, "/api/v1");
  }

  async loadPlugins() {
    await this.router?.fastify.register(fastifyCookie);
    await this.router?.fastify.register(fastifySession, { secret: "a secret with minimum length of 32 characters" });
  }

  async loadMiddlewares() {
    await this.router?.registerMiddleware(isAuthenticated);
  }

  async loadControllers() {
    await this.router?.registerController(new AuthController());
    await this.router?.registerController(new UserController());
    await this.router?.registerController(new WorkspaceController());
    await this.router?.registerController(new ProjectController());
  }

  async listen() {
    await this.fastify.listen({
      port: this.port,
      listenTextResolver: (address) => {
        return `quick.dev server running at ${address}`;
      },
    });
  }

  async start() {
    try {
      await this.initialize();
      await this.loadPlugins();
      await this.loadMiddlewares();
      await this.loadControllers();
      await this.listen();
    } catch (err) {
      console.error(err);
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}

(async function _main_() {
  const server = new Server();
  await server.start();
})();
