import { Kafka } from "kafkajs"
import type { ProducerConfig } from "kafkajs";
import { KAFKA_BROKERS } from "./env";

const kafka = new Kafka({
  clientId: "scheduler",
  brokers: KAFKA_BROKERS,
})

const options: ProducerConfig = {
  allowAutoTopicCreation: true
}

export const producer = kafka.producer(options)