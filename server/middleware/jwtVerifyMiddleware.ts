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
      cart: cartItemType[];
    };
  }
}

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401);
      throw new Error("Not authorized");
    }
    // Bearer <token>
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as Secret,
      (err, decoded) => {
        if (err) {
          // access token is either temepered or expired
          res.status(403);
          throw new Error("Invalid token");
        }
        req.user = {
          fullName: (decoded as JwtPayload)?.fullName,
          isAdmin: (decoded as JwtPayload)?.isAdmin,
          cart: (decoded as JwtPayload)?.cart || [],
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
