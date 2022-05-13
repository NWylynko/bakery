import { v4 as uuid } from "uuid";
import { users } from "../mongo";
import { hashPassword } from "../lib/password";

interface Register {
  username: string;
  password: string;
}

export const register = async ({ username, password }: Register) => {

  const potentialUser = await users.findOne({ username });

  if (potentialUser) {
    throw new Error("User already exists");
  }

  const userId = uuid();

  const hashedPassword = await hashPassword(password);

  await users.insertOne({
    userId,
    username,
    password: hashedPassword
  });

  return {
    userId,
    username,
  }
}