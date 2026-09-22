import express from "express";
import {
  addAnswerToQuestion,
  addQuestion,
  addReplytoReview,
  addReview,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  updateCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse,
);

courseRouter.put(
  "/update/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateCourse,
);

courseRouter.get(
  "/get/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getSingleCourse,
);

courseRouter.get(
  "/getAll/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCourses,
);

courseRouter.get(
  "/getCourseContent/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getCourseByUser,
);

courseRouter.put("/addQuestion", isAuthenticated, addQuestion);
courseRouter.put("/addAnswer", isAuthenticated, addAnswerToQuestion);
courseRouter.put("/addReview/:id", isAuthenticated, addReview);

courseRouter.put(
  "/addReplyToReview",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplytoReview,
);

export default courseRouter;
