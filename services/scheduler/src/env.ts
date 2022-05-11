import "dotenv/config";

export const KAFKA_BROKERS: string[] = (() => {
  const env = process.env.KAFKA_BROKERS;

  if (!env) {
    throw new Error("KAFKA_BROKERS is not defined");
  }

  try {
    
    const brokers = JSON.parse(env);

    if (!Array.isArray(brokers)) {
      throw new Error("KAFKA_BROKERS is not a json array");
    }

    return brokers;

  } catch (error) {
    
    throw new Error(`Failed to parse KAFKA_BROKERS: ${error}`);

  }
})();

console.log({ KAFKA_BROKERS })