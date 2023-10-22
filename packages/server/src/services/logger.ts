import pino from "pino";
import pretty from "pino-pretty";

const isProd = process.env.ENVIRONMENT === "production";

const pinoArgs = isProd ? [{ level: "info" }] : [{ level: "debug" }, pretty()];

export const logger = pino(...pinoArgs);
