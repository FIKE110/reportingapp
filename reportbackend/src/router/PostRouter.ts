import express from "express";
import { createPost, getPosts, getPostImage } from "../controller/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { createPostMiddleware } from "../middleware/PostMiddleware";

export const PostRouter=express.Router()
PostRouter.use(AuthMiddleware)
PostRouter.get('/',getPosts)
PostRouter.post('/',createPostMiddleware,createPost)
PostRouter.get('/:postId/image',getPostImage)