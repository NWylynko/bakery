import "dotenv/config";

import { readEnvArray, readEnvString } from "@bakery/read-env"

export const KAFKA_BROKERS = readEnvArray(process.env.KAFKA_BROKERS);
export const MONGODB_URL = readEnvString(process.env.MONGODB_URL);

console.log({ KAFKA_BROKERS, MONGODB_URL })