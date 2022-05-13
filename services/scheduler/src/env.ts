import "dotenv/config";

import { readEnvArray } from "@bakery/read-env"

export const KAFKA_BROKERS = readEnvArray(process.env.KAFKA_BROKERS);

console.log({ KAFKA_BROKERS })