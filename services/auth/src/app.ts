import Fastify from "fastify";

import { registerHandler } from "./endpoints/register";
import { loginRegister } from "./endpoints/login";


export const app = Fastify({ logger: true });


app.post("/register", registerHandler)
app.post("/login", loginRegister)

