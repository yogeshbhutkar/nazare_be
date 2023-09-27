import express, { Router } from "express";
import { getPosts } from "../controllers/posts";
import { SignIn, signUp } from "../controllers/auth";

const router: Router = express.Router();

//Get all posts.
router.get("/", getPosts);

router.post("/sign-in", SignIn);
router.post("/sign-up", signUp);

export default router;
