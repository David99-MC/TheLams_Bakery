import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import { config } from "dotenv";
import type { cartItemType } from "../src/models/user";
config();

// Ref: https://www.linkedin.com/pulse/working-typescript-express-tim-kent/
declare module "express-serve-static-core" {
  interface Request {
    user: {
      fullName: string;
      isAdmin: boolean;
    };
  }
}

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    // Bearer <token>
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized");
    }
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret,
      (err, decoded) => {
        if (err) {
          // access token is either temepered with or expired
          res.status(403);
          throw new Error("Invalid token");
        }
        req.user = {
          fullName: (decoded as JwtPayload)?.fullName,
          isAdmin: (decoded as JwtPayload)?.isAdmin,
        };
        next();
      }
    );
  }
);

////// Original code
// const token = req.cookies["jwt"];
// if (token) {
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as Secret
//     ) as JwtPayload;

//     const foundUser = await User.findById(decoded.userId).select(
//       "-password"
//     );

//     // attach the user to the request object for frontend
//     req.user = {
//       userId: foundUser?._id,
//       username: foundUser?.username || "",
//     };
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("Not authorized, invalid token");
//   }
// }
// if (!token) {
//   res.status(401);
//   throw new Error("Not authorized, no token");
// }
