require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middelware/error";

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ success: 200, message: "Server is running" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

app.use(ErrorMiddleware);
