import { NextFunction, Request,Response } from "express"
import { Postchema } from "../model/post"

export async function createPostMiddleware(req:Request,res:Response,next:NextFunction){
   try{
    const {title,category,location,unique_user_id}=req.body
    const file=req.file
    console.log(unique_user_id)
    if(file && unique_user_id){
        Postchema.parse({user_id:parseInt(unique_user_id),title,category ,location})
        next()
    }
    else{
        res.json({error:'No profile image uploaded'})
    }
       
   }
   catch(e:any){
    res.json({error:e.message})
   } 
}