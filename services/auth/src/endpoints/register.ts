import type { FastifyReply, FastifyRequest } from "fastify";
import { register } from "../actions/register";
import { credentialsSchema } from "../lib/credentialsSchema";
import { generateJwt } from './../lib/jwt';

interface RegisterReply {
  userId: string;
  username: string;
  jwt: string;
}

export const registerHandler = async (req: FastifyRequest, res: FastifyReply): Promise<RegisterReply> => {

  const { username, password } = await credentialsSchema.validate(req.body);

  const user = await register({ username, password });

  const jwt = await generateJwt(user)

  return { ...user, jwt };

}