import express from "express";
import { createPost, getPosts, getPostImage, getPostsById } from "../controller/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { createPostMiddleware } from "../middleware/PostMiddleware";

export const PostRouter=express.Router()
PostRouter.get('/',AuthMiddleware,getPosts)
PostRouter.post('/',AuthMiddleware,createPostMiddleware,createPost)
PostRouter.get('/user',AuthMiddleware,getPostsById)
PostRouter.get('/:postId/image',getPostImage)