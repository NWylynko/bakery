import { comparePassword } from '../lib/password';
import { users } from "../mongo";

interface Login {
  username: string;
  password: string;
}

export const login = async ({ username, password }: Login) => {

  const potentialUser = await users.findOne({ username });

  if (!potentialUser) {
    throw new Error("User does not exist");
  }

  const {
    userId,
    password: hashedPassword
  } = potentialUser;

  const isPasswordValid = await comparePassword(password, hashedPassword);

  if (!isPasswordValid) {
    throw new Error("Password is invalid");
  }

  return {
    userId,
    username,
  }
}