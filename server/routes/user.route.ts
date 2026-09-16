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

const userRouter = express.Router();

userRouter.post("/registration", registerUser);
userRouter.post("/activate", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, authorizeRoles("admin"), logoutUser);
userRouter.get("/refresh-token", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUser);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user", isAuthenticated, updateUserInfo);
userRouter.put("/update-password", isAuthenticated, updateUserPassword);
userRouter.put("/update-avatar", isAuthenticated, updateUserAvatar);
export default userRouter;
