import { Response } from "express";
import { User } from "../models/users.model";

export const getUserById = async (id: string, res: Response) => {
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
};
