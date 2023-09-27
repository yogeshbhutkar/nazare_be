import { Request, Response } from "express";
import { PostValidator } from "../lib/validators/post";
import { db } from "../lib/prisma";
import { z } from "zod";
import { User } from "@prisma/client";

// upload post.
export const uploadPost = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const { title, description, content } = PostValidator.parse(body);

    //@ts-ignore
    const user: User = req.user;
    const userId = user.id;

    const post = await db.post.create({
      data: {
        title,
        description,
        userId,
        content,
      },
    });
    return res.status(200).json({
      message: "Success",
      post_title: post.title,
      post_description: post.description,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({ message: "Invalid post data passed." });
    }

    return res.status(500).json({ message: "Something went wrong." });
  }
};

// fetch all posts.
export const fetchAllPost = async (req: Request, res: Response) => {
  try {
    const posts = await db.post.findMany();
    return res.status(200).json({
      message: "Success",
      posts: posts,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// fetch a particular post.
export const fetchOnePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const post = await db.post.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: "Success",
      post_title: post?.title,
      post_description: post?.description,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json({ message: "Invalid post data passed." });
    }

    return res.status(500).json({ message: "Something went wrong." });
  }
};
