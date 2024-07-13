import { Request,Response } from "express";
import { Postchema } from "../model/post";
import { number } from "zod";

export function getPosts(req:Request,res:Response){
    res.send("getting reposnse")
}

export function createPost(req:Request,res:Response){
    try{
    const {user_id,title,category,location}=req.body
    Postchema.parse({user_id:parseInt(user_id),title,category , location})
    res.send("creating post")
    }
    catch(e:any){
        res.json({error:e.message})
    }
}