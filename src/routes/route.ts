import express, { Router } from "express";
import { SignIn, signUp } from "../controllers/auth";
import { verify } from "../lib/authMiddleware";
import { fetchAllPost, fetchOnePost, uploadPost } from "../controllers/posts";

const router: Router = express.Router();

//Get all posts.
// router.get("/", getPosts);

// CRUD for Auth.
/**
 * @swagger
 * paths:
 *  /api/nazare/sign-in:
 *   post:
 *     summary: sign in
 *     tags:
 *      - auth
 *     description:  Sign Into our servers.
 *     responses:
 *        200:
 *          description: Success
 *        400:
 *           description: Invalid post data
 *        401:
 *           description: Invalid username or password
 *
 *  /api/nazare/sign-up:
 *   post:
 *     summary: sign up
 *     tags:
 *      - auth
 *     description:  Sign up to our servers.
 *     responses:
 *        200:
 *          description: Success
 *        400:
 *           description: Invalid post data
 *        401:
 *           description: Invalid username or password
 *
 * /api/nazare/post:
 *   get:
 *     summary: fetch all posts
 *     tags:
 *      - posts
 *     description:  Fetch all the posts from DB.
 *     responses:
 *        200:
 *          description: Success
 *        500:
 *           description: Internal Server Error
 * /api/nazare/post/{id}:
 *   get:
 *     summary: get a post
 *     tags:
 *      - posts
 *     description:  Get a particular post using id.
 *     responses:
 *        200:
 *          description: Success
 *        422:
 *           description: Invalid post data
 *        500:
 *           description: Internal server error
 *
 * /api/nazare/post/create:
 *   post:
 *     summary: create post
 *     tags:
 *      - posts
 *     description:  Create a particular post.
 *     responses:
 *        200:
 *          description: Success
 *        422:
 *           description: Invalid post data
 *        500:
 *           description: Internal server error
 *
 *
 */
router.post("/sign-in", SignIn);
router.post("/sign-up", signUp);

// CRUD for Post.
router.get("/post/:id", verify as any, fetchOnePost);
router.get("/post", verify as any, fetchAllPost);
router.post("/post/create", verify as any, uploadPost);

export default router;
