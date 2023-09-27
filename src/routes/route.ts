import express, { Router } from "express";
import { SignIn, signUp } from "../controllers/auth";
import { verify } from "../lib/authMiddleware";
import { fetchAllPost, fetchOnePost, uploadPost } from "../controllers/posts";

const router: Router = express.Router();

//Get all posts.
// router.get("/", getPosts);

// CRUD for Auth.
router.post("/sign-in", SignIn);
router.post("/sign-up", signUp);

// CRUD for Post.
router.get("/post/:id", verify as any, fetchOnePost);
router.get("/post", verify as any, fetchAllPost);
router.post("/post/create", verify as any, uploadPost);

export default router;
