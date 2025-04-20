import express, { Request, Response, NextFunction } from "express";
import {isAuthenticated} from "../middlewares/isAuthenticated";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controllers/orderController";
const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.route("/").get(isAuthenticated, asyncHandler(getOrders));
router.route("/checkout/create-checkout-session").post(isAuthenticated, asyncHandler(createCheckoutSession));
router.route("/webhook").post(express.raw({type: 'application/json'}), asyncHandler(stripeWebhook));

export default router;