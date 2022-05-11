import "source-map-support/register";
import "dotenv/config";

import { app } from "./app";
import { producer } from "./kafka"
import { registerEvents } from "./events";

const main = async () => {
  try {
    await producer.connect();
    console.log("Connected to Kafka");
    await app.listen("4000", "0.0.0.0")
    console.log(`Server listening at`, app.server.address())
    await registerEvents();
    console.log("Registered events");
  } catch (error) {
    console.error(`failed to start server: ${error}`)
  }
}

main()