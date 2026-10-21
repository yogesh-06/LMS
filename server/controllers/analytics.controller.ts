import { Request, Response, NextFunction, response } from "express";
import { CatchAsyncError } from "../middelware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLastYearData } from "../utils/analytics.generator";
import { User } from "../models/users.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/orders.model";

// Get user analytics
export const getUserAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLastYearData(User);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const getCourcesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cources = await generateLastYearData(CourseModel);

      res.status(200).json({
        success: true,
        cources,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const getOrderAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLastYearData(OrderModel);

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
