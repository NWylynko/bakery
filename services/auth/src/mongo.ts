import { MongoClient } from 'mongodb';
import { MONGODB_URL } from "./env"

export const mongo = new MongoClient(MONGODB_URL);
export const users = mongo.db("auth").collection<User>("users");

interface User {
  userId: string;
  username: string;
  password: string;
}