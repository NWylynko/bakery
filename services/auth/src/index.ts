import "source-map-support/register";
import "dotenv/config";

import { app } from "./app";
import { mongo } from "./mongo";

const main = async () => {
  try {
    await mongo.connect();
    console.log(`Mongo connected`);
    await app.listen("4000", "0.0.0.0")
    console.log(`Server listening at`, app.server.address())
  } catch (error) {
    console.error(`failed to start server: ${error}`)
  }
}

main()