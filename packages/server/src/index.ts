import "dotenv/config";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { UserController } from "./controllers/UserController";
import { WorkspaceController } from "./controllers/workspaces";
import { ProjectController } from "./controllers/projects";
import { Router } from "./services/Router";
import { AuthController } from "./controllers/AuthController";
// import { routes } from "./routes";

class Server {
  port: number;
  fastify: FastifyInstance;

  constructor() {
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.fastify = Fastify({ logger: { level: "debug" } });
  }

  async loadRoutes() {
    const router = new Router({ fastify: this.fastify });
    await router.register("/auth", new AuthController());
    await router.register("/users", new UserController());
    await router.register("/workspaces", new WorkspaceController());
    await router.register("/projects", new ProjectController());
  }

  async start() {
    try {
      await this.fastify.listen({
        port: this.port,
        listenTextResolver: (address) => {
          return `quick.dev server running at ${address}`;
        },
      });
    } catch (err) {
      console.error(err);
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}

(async function _main_() {
  const server = new Server();
  await server.loadRoutes();
  await server.start();
})();
