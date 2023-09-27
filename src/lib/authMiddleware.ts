import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedUser extends Request {
  user: User;
}

export const verify = (
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token invalid" });
      }
      if (user === undefined) {
        return res.status(400).json({ error: "something went wrong" });
      }
      req.user = user as User;
      next();
    });
  } else {
    return res.status(400).json({ error: "Unauthorized" });
  }
};
