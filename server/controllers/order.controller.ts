import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middelware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/orders.model";
import NotificationModel from "../models/notification.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import { User } from "../models/users.model";
import CourseModel from "../models/course.model";
import { newOrder } from "../services/order.service";

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, paymentInfo } = req.body as IOrder;

      const user = await User.findById(req.user?._id);

      const isCourseExist = user?.courses.some(
        (course: any) => course._id.toString() === courseId,
      );

      if (isCourseExist) {
        return next(
          new ErrorHandler("User already purchased this course", 400),
        );
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const mailData = {
        user: user?.name,
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          quantity: 1,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirm.mail.ejs"),
        mailData,
      );

      try {
        if (user) {
          await sendMail({
            email: user?.email,
            subject: "Order confirmation",
            template: "order-confirm.mail.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(courseId);
      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New order",
        message: `You have a new order from ${course?.name}`,
      });

      course.purchased ? (course.purchased += 1) : course.purchased;
      await course?.save();

      const data: any = {
        userId: user?._id,
        courseId,
      };
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
