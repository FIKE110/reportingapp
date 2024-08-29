import express from "express";
import { createPost, deletePost, editPost, getPosts, getPostsById } from "../controller/PostController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { createPostMiddleware, editPostMiddleware } from "../middleware/PostMiddleware";

export const PostRouter=express.Router()
PostRouter.get('/',AuthMiddleware,getPosts)
PostRouter.post('/',AuthMiddleware,createPostMiddleware,createPost)
PostRouter.get('/user',AuthMiddleware,getPostsById)
PostRouter.put('/:postId',editPostMiddleware,AuthMiddleware,editPost)
PostRouter.delete('/:postId',AuthMiddleware,deletePost)