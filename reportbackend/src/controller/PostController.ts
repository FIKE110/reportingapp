import { Request,Response } from "express";
import { Post } from "../model/post";
import { User } from "../model/user";

export async function createPost(req:Request,res:Response){
    try{
    const {title,category,location,unique_user_id}=req.body
    const file=req.file
    const newPost=await Post.create({user_id:unique_user_id,title,category,location,image:file?.buffer,
        image_name:file?.originalname,image_mime:file?.mimetype
    }) 
        if(newPost){
            res.status(201).json({message:"Post succesfully uploaded"})
        }
        else{
            res.json({error:"Image not uploaded"})
        }
    }
    catch(e:any){
        res.json({error:e.message})
    }
}


export async function getPostImage(req:Request,res:Response){
    try{
        const {postId}=req.params
        const {image,image_mime}:any=await Post.findByPk(postId)
        res.setHeader("Content-Type",image_mime)
        res.send(image)
    }
    catch(e:any){
        res.json({error:e})
    }
}

export async function getPosts(req:Request,res:Response){
    try{
        let posts:any[]=[]
        const getPosts:any[]=await Post.findAll()
        getPosts.map(item=>{
            const {id,user_id,location,createdAt,title,category}=item
            posts.push({id,user_id,location,createdAt,title,category,imageurl:`${id}/image`})
        })
        res.json({posts:posts})
    }
    catch(e:any){
        res.json({error:e.message})
    }
}


export async function getPostsById(req:Request,res:Response){
    const {unique_user_id} = req.body


    try{
        const post=await Post.findAll({
            where:{
                user_id:unique_user_id
            },
        })
        res.json(post)
    }
    catch(e){
        console.log(e)
    }
}