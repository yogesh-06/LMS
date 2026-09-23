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
