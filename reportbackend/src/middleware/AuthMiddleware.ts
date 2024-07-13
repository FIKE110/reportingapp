import { NextFunction, Request,Response } from "express";
import { verifyJwtService } from "../services/jwt";

export function AuthMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(token){
            const payload:any=verifyJwtService(token)
            req.body.unique_user_id=payload.id
            console.log(payload)
            next()
        }
        else{
            res.status(404).json({error:"token not sent"})
        }
    }
    catch(e:any){
        res.json({"error":e.message})
    }
} 