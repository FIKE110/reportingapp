import express from "express";
import { createPost, getPosts } from "../controller/PostController";

export const PostRouter=express.Router()
PostRouter.get('/',getPosts)
PostRouter.post('/',createPost)