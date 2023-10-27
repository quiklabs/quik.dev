import "dotenv/config";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { routes } from "./routes";

class Server {
  port: number;
  fastify: FastifyInstance;

  constructor() {
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.fastify = Fastify({ logger: { level: "debug" } });
  }

  async loadRoutes() {
    this.fastify.register(routes, { prefix: "/api/v1" });
    await this.fastify.ready();
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
