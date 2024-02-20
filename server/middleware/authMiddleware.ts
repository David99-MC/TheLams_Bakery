import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import User from "../src/models/user";
import Mongoose from "mongoose";

// Ref: https://www.linkedin.com/pulse/working-typescript-express-tim-kent/
declare module "express-serve-static-core" {
  interface Request {
    user: {
      userId?: Mongoose.Types.ObjectId;
      username: string;
    };
  }
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["jwt"];
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as Secret
        ) as JwtPayload;

        const foundUser = await User.findById(decoded.userId).select(
          "-password"
        );

        // attach the user to the request object for frontend
        req.user = {
          userId: foundUser?._id,
          username: foundUser?.username || "",
        };
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
