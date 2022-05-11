import Fastify from "fastify";
import { hello } from "@bakery/hello";

const app = Fastify({ logger: true });

app.get("/", async () => {
  const message = await hello();
  return { message };
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