import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUser,
  socialAuth,
  updateUserInfo,
  updateUserPassword,
  updateUserAvatar,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";

const router = express.Router();

router.post("/registration", registerUser);
router.post("/activate", activateUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, authorizeRoles("admin"), logoutUser);
router.get("/refresh-token", updateAccessToken);
router.get("/me", isAuthenticated, getUser);
router.post("/social-auth", socialAuth);
router.put("/update-user", isAuthenticated, updateUserInfo);
router.put("/update-password", isAuthenticated, updateUserPassword);
router.put("/update-avatar", isAuthenticated, updateUserAvatar);
export default router;
