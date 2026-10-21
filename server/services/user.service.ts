import { Response } from "express";
import { redis } from "../utils/redis";
import { User } from "../models/users.model";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

// Get all users
export const getAllUsersService = async (res: Response) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update userRole service
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string,
) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
