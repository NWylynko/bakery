import type { FastifyReply, FastifyRequest } from "fastify";
import { login } from "../actions/login";
import { credentialsSchema } from "../lib/credentialsSchema";
import { generateJwt } from "../lib/jwt";

interface LoginReply {
  userId: string;
  username: string;
  jwt: string;
}

export const loginHandler = async (req: FastifyRequest, res: FastifyReply): Promise<LoginReply> => {

  const { username, password } = await credentialsSchema.validate(req.body);

  const user = await login({ username, password });

  const jwt = await generateJwt(user);

  return { ...user, jwt };

}