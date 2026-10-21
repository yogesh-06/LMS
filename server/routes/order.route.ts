import express from "express";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post(
  "/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createOrder,
);

orderRouter.get(
  "/getAll/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders,
);

export default orderRouter;
