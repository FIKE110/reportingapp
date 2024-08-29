import { NextFunction, Request,Response } from "express";
import { verifyJwtService } from "../services/jwt";

export function AuthMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token=req.headers.authorization?.trim().substring(7)
        console.log("token",token)
        if(token){
            const payload:any=verifyJwtService(token)
            req.body.unique_user_id=payload.id
            next()
        }
        else{
            res.status(404).json({error:"token not sent"})
        }
    }
    catch(e:any){
        res.json({"error":e.message,"message":"this is a bearer token authentication"})
    }
} 