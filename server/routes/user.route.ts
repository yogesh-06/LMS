import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middelware/auth";

const router = express.Router();

router.post("/registration", registerUser);
router.post("/activate", activateUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);

export default router;
