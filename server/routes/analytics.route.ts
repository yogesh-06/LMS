import { Router } from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import {
  getCourcesAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";

const analyticsRouter = Router();

analyticsRouter.get(
  "/getUserAnalytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics,
);
analyticsRouter.get(
  "/getOrderAnalytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrderAnalytics,
);
analyticsRouter.get(
  "/getCourcesAnalytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCourcesAnalytics,
);

export default analyticsRouter;
