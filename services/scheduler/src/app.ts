import Fastify from "fastify";

import { indexHandler } from "./endpoints";

export const app = Fastify({ logger: true });

app.get("/", indexHandler)

