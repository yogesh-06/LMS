import { Router } from "express";
import {
  createLayout,
  getLayoutByType,
  updateLayout,
} from "../controllers/layout.controller";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";

const layoutRouter = Router();

layoutRouter.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout,
);

layoutRouter.put(
  "/update",
  isAuthenticated,
  authorizeRoles("admin"),
  updateLayout,
);

layoutRouter.get("/get/:type", isAuthenticated, getLayoutByType);

export default layoutRouter;
