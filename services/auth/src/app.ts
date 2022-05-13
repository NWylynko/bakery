import Fastify from "fastify";

import { registerHandler } from "./endpoints/register";
import { loginHandler } from "./endpoints/login";


export const app = Fastify({ logger: true });


app.post("/register", registerHandler)
app.post("/login", loginHandler)

