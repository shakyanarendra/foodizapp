import express, { Request, Response, NextFunction } from "express";
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controllers/restaurantController";
import upload from "../middlewares/multer";
import {isAuthenticated} from "../middlewares/isAuthenticated";

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("imageFile"), asyncHandler(createRestaurant));
router.route("/").get(isAuthenticated, asyncHandler(getRestaurant));
router.route("/").put(isAuthenticated, upload.single("imageFile"), asyncHandler(updateRestaurant));
router.route("/order").get(isAuthenticated,  asyncHandler(getRestaurantOrder));
router.route("/order/:orderId/status").put(isAuthenticated, asyncHandler(updateOrderStatus));
router.route("/search/:searchText").get(isAuthenticated, asyncHandler(searchRestaurant));
router.route("/:id").get(isAuthenticated, asyncHandler(getSingleRestaurant));

export default router;


