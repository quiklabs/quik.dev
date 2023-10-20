import Fastify from "fastify";
import pino from "pino";
import { routes } from "./routes";

const fastify = Fastify({ logger: pino({ level: "info" }) });

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
