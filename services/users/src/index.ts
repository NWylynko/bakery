import "source-map-support/register";
import "dotenv/config";

import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/", async () => {
  return { message: "Hello World: users" };
})

const main = async () => {
  try {
    await app.listen("4000", "0.0.0.0")
    console.log(`Server listening at`, app.server.address())
  } catch (error) {
    console.error(`failed to start server: ${error}`)
  }
}

main()