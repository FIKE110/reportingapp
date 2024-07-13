import { NextFunction, Request,Response } from "express";
import { verifyJwtService } from "../services/jwt";

export function AuthMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const token=req.headers.authorization
        if(token){
            const payload=verifyJwtService(token)
            req.body.payload=payload
            next()
        }
    }
    catch(e:any){
        res.json({"error":e.message})
    }
} 