import { NextFunction, Request,Response } from "express"
import { Postchema } from "../model/post"

export async function createPostMiddleware(req:Request,res:Response,next:NextFunction){
   try{
    const {title,category,location,unique_user_id,content,image}=req.body
    if(unique_user_id){
        Postchema.parse({user_id:parseInt(unique_user_id),title,category ,location,content,image:image.split(",")[1]})
        next()
    }
    else{
        res.json({error:'No post image uploaded'})
    }
       
   }
   catch(e:any){
    res.json({error:e.message})
   } 
}

export async function editPostMiddleware(req:Request,res:Response,next:NextFunction){
    try{
        const post=req.body
        console.log(post)
        if(post.title && post.image && post.content){
            req.body.post=post
            next()
        }
        else{
            res.send({error:"Please send a body"})
        }
    }
    catch(e){
        res.send({error:e})
    }
}