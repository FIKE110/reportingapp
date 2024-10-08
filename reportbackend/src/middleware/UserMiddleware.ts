import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { hashPassword } from "../services/auth";

const requestSchema=z.object({
    username:z.string().min(4,{message:"Username should be above 5 in length"}),
    password:z.string().min(6,{message:"Password should be 6 in length"}),
    email:z.string().email({message:"Invalid email"})
})

export async function CreateUserMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const {username,password,email}=req.body
        const auth=requestSchema.parse({username,password,email})
        req.body.password=await hashPassword(auth.password)
        next()
    }
    catch(e:any){
        res.status(404).json({error:e.message})
    }
}