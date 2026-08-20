require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/users.model";
import { CatchAsyncError } from "../middelware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, avatar }: IRegistrationBody = req.body;
      const isEmailExist = await User.findOne({ email });

      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }
      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = { user: user.name, activationCode: activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation.mail.ejs"),
        data,
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation.mail.ejs",
          data: data,
        });
        console.log("registerUser called 1");
        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        console.log("registerUser called 2");

        return next(new ErrorHandler(error.message, 400));
      }

      // res.status(201).json({
      //   success: true,
      //   message: "User registered successfully",
      //   activationToken: activationToken.token,
      //   html: html,
      // });
    } catch (error: any) {
      console.log("registerUser called 33");
      return next(new ErrorHandler(error.message, 400));
    }
  },
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" },
  );

  return { token, activationCode };
};
