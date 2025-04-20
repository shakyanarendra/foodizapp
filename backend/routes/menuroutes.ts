import express, { Request, Response, NextFunction } from "express";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { addMenu, editMenu } from "../controllers/menuController";
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), asyncHandler(addMenu));
router.route("/:id").put(isAuthenticated, upload.single("image"), asyncHandler(editMenu));

export default router;
