import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import {
  getAllNotifications,
  updateNotifications,
} from "../controllers/notification.controller";

const notificationsRouter = express.Router();

notificationsRouter.get(
  "/getAll",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllNotifications,
);

notificationsRouter.put(
  "/updateById/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotifications,
);

export default notificationsRouter;
