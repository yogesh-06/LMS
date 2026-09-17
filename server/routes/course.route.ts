import express from "express";
import { updateCourse, uploadCourse } from "../controllers/course.controller";
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
export default courseRouter;
