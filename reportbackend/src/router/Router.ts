import express from "express";
import { PostRouter } from "./PostRouter";
import { UserRouter } from "./UserRouter";

export const Router=express.Router()
Router.use('/post',PostRouter)
Router.use("/user",UserRouter)