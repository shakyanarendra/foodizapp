import express, { Request, Response, NextFunction } from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
  verifyEmail,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

// Utility function to handle async route errors
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, asyncHandler(checkAuth));
router.route("/signup").post(asyncHandler(signup));
router.route("/login").post(asyncHandler(login));
router.route("/logout").post(asyncHandler(logout));
router.route("/verify-email").post(asyncHandler(verifyEmail));
router.route("/forgot-password").post(asyncHandler(forgotPassword));
router.route("/reset-password/:token").post(asyncHandler(resetPassword));
router
  .route("/profile/update")
  .put(isAuthenticated, asyncHandler(updateProfile));

export default router;
