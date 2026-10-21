import { Response } from "express";
import { CatchAsyncError } from "../middelware/catchAsyncError";
import OrderModel from "../models/orders.model";

// Create order

export const newOrder = CatchAsyncError(async (data: any, res: Response) => {
  const order = await OrderModel.create(data);
  res.status(200).json({
    success: true,
    order,
  });
});

// Get all orders
export const getAllOrderesService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
};
