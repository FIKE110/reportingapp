import { Router } from "express";
import { signJwtSerivce } from "../services/jwt";
import { createUser, loginUserByAuth } from "../controller/UserController";
import { CreateUserMiddleware } from "../middleware/UserMiddleware";

export const UserRouter:Router=Router()

UserRouter.post('/register',CreateUserMiddleware,createUser)
UserRouter.post('/login',loginUserByAuth)
