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
    await this.fastify.register(routes, { prefix: "/api/v1" });
  }

  async start() {
    try {
      await this.fastify.listen({ port: 3000 });
    } catch (err) {
      console.error(err);
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}

(async function _main_() {
  console.log("Initializing ...");
  const server = new Server();
  console.log("Loading ...");
  await server.loadRoutes();
  console.log("Starting ...");
  await server.start();
  console.log("OK");
})();
