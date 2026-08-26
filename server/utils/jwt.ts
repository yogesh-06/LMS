require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/users.model";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httponly: boolean;
  samesite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response,
) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // parse environment variable to integrate with fallback mechanism
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10,
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10,
  );

  // options for access token cookie
  const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000), // convert minutes to milliseconds
    maxAge: accessTokenExpire * 60 * 1000, // convert minutes to milliseconds
    httponly: true,
    samesite: "lax",
    secure: process.env.NODE_ENV === "production", // set secure flag in production
  };

  // options for refresh token cookie
  const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 60 * 1000), // convert minutes to milliseconds
    maxAge: refreshTokenExpire * 60 * 1000, // convert minutes to milliseconds
    httponly: true,
    samesite: "lax",
    secure: process.env.NODE_ENV === "production", // set secure flag in production
  };

  // store refresh token in Redis
  redis.set(String(user._id), JSON.stringify(user) as any);

  // set cookies in response
  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  // send response
  res.status(statusCode).json({
    success: true,
    message: "Authentication successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
};
