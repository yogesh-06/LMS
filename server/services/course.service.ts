import { Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middelware/catchAsyncError";

// Create course

export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = CourseModel.create(data);

    res.status(201).json({
      success: true,
      course,
    });
  },
);
