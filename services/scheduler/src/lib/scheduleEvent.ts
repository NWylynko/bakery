import cron from "node-cron";
import { producer } from "../kafka";

export const scheduleEvents = async (cronExpression: string, topicName: string, payload?: Object) => {
  console.info(`Scheduling event '${topicName}' to fire off at ${cronExpression}`);
  return cron.schedule(cronExpression, () => {
    console.info(`Firing off event '${topicName}'`);
    return producer.send({
      topic: topicName,
      messages: [
        {
          timestamp: Date.now().toString(),
          value: JSON.stringify(payload),
        }
      ]
    });
  })
}