import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { db } from "../lib/prisma";
import { UserValidator } from "../lib/validators/user";
import { Request, Response } from "express";
import { z } from "zod";

const generateAccessToken = (user: User) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET!
  );
};

// To be tested.
// const generateRefreshToken = (user: User) => {
//   return jwt.sign(
//     { id: user.id, username: user.username },
//     process.env.REFRESH_SECRET!
//   );
// };

export const signUp = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const { username, password } = UserValidator.parse(body);

    const user = await db.user.create({
      data: {
        username,
        password,
      },
    });

    return res.status(200).json({
      message: "User created successfully.",
      username: username,
      access_token: generateAccessToken(user),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({ message: "Invalid post data passed." });
    }

    return res.status(500).json({
      message: "Username already taken.",
    });
  }
};

export const SignIn = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const { username, password } = UserValidator.parse(body);

    const user = await db.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });

    if (user) {
      return res.status(200).json({
        message: "Success",
        username: user.username,
        access_token: generateAccessToken(user),
      });
    } else {
      return res.status(401).json({
        message: "Failure",
        reason: "Invalid username and/ or password",
      });
    }
  } catch (err) {
    return res.status(400).json({ message: "Invalid post data." });
  }
};
