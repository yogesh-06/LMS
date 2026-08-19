import Redis from "ioredis";
import { log } from "node:console";
require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_HOST) {
    console.log("Redis connected!");
    return process.env.REDIS_HOST;
  }
  throw new Error("Redis host is not defined in the environment variables");
};

export const redis = new Redis(redisClient());
