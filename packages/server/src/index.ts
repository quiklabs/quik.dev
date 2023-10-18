import Fastify from "fastify";
import pino from "pino";

const fastify = Fastify({ logger: pino({ level: "info" }) });

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

async function main() {
  // Run the server!
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
