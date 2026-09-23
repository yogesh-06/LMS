import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { createOrder } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createOrder,
);

export default orderRouter;
