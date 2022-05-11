import type { FastifyRequest, FastifyReply } from "fastify";

export const indexHandler = async (req: FastifyRequest, res: FastifyReply) => {
  return { message: "schedule" };
}