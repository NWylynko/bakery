import type { FastifyRequest, FastifyReply } from "fastify";

export const loginRegister = async (req: FastifyRequest, res: FastifyReply) => {
  return { message: "login" };
}