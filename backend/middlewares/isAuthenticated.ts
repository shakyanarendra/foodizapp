import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id?: string; // Marking `id` as optional for better compatibility
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies?.token; // Use optional chaining to avoid runtime errors
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

    // Ensure decoding was successful and contains `userId`
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Attach user ID to the request object
    req.id = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
