import express from "express";
import { createPost, getPosts, getPostImage } from "../controller/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const PostRouter=express.Router()
PostRouter.use(AuthMiddleware)
PostRouter.get('/',getPosts)
PostRouter.post('/',createPost)
PostRouter.get('/:postId/image',getPostImage)