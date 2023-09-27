import { Request, Response } from "express";

// fetch all posts
export const getPosts = (req: Request, res: Response) => {
  return res.status(200).json({ message: "temporary text." });
};
