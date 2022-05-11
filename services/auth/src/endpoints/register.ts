import type { FastifyRequest, FastifyReply } from "fastify";

export const registerHandler = async (req: FastifyRequest, res: FastifyReply) => {
  return { message: "register" };
}