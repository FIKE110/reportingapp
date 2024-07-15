import { Router } from "express";
import { signJwtSerivce } from "../services/jwt";
import { createUser, getUserByToken, getUserProfileById, getUserProfileImageById, loginUserByAuth } from "../controller/UserController";
import { CreateUserMiddleware } from "../middleware/UserMiddleware";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const UserRouter:Router=Router()

UserRouter.post('/register',CreateUserMiddleware,createUser)
UserRouter.post('/login',loginUserByAuth)
UserRouter.get('/:username/image',AuthMiddleware,getUserProfileImageById)
UserRouter.get('/profile',AuthMiddleware,getUserByToken)
UserRouter.get('/:userId',AuthMiddleware,getUserProfileById)