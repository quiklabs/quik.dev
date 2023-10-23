import "dotenv/config";
import Fastify from "fastify";
import { routes } from "./routes";
import { logger } from "./services/logger";

const fastify = Fastify({ logger });

async function main() {
  await fastify.register(routes, { prefix: "/api/v1" });

  // Run the server!
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
