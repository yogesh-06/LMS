import Redis from "ioredis";
require("dotenv").config();

const redisUrl = process.env.REDIS_HOST;

if (!redisUrl) {
  throw new Error("Redis host is not defined in the environment variables");
}

export const redis = new Redis(redisUrl);

redis.on("connect", () => {
  console.log("Redis connected!");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});
