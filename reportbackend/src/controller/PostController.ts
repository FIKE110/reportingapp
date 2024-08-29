import { Request,Response } from "express";
import { Post } from "../model/post";

export async function createPost(req:Request,res:Response){
    try{
    const {title,category,location,unique_user_id,content,image}=req.body
    const newPost=await Post.create({user_id:unique_user_id,title,category,location,content,image
    }) 
        if(newPost){
            res.status(201).json({message:"Post succesfully uploaded"})
        }
        else{
            res.json({error:"Post not uploaded"})
        }
    }
    catch(e:any){
        res.json({error:e.message})
    }
}



export async function getPosts(req:Request,res:Response){
    try{
        let posts:any[]=[]
        const category=req.query.category
        const profile=req.query.user
        const unique_user_id=req.body.unique_user_id
        console.log(req.query)
        let getPosts:any[]=profile ? await Post.findAll({where:{
            user_id:unique_user_id
        }}) : category ? await Post.findAll({where:{
            category:category
        }
        }) : await Post.findAll()

        getPosts.map(item=>{
            const {id,user_id,location,createdAt,title,category,content,image}=item
            posts.push({id,user_id,location,createdAt,title,category,image,content})
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

export async function deletePost(req:Request,res:Response){
    try{
        const {unique_user_id}=req.body
        const post_id=req.params.postId
        Post.destroy({where:{
            user_id:unique_user_id,
            id:post_id
        }})
        res.send({message:"Post was deleted"})
    }
    catch(e){
        res.send({error:e})
    }
}

export async function editPost(req:Request,res:Response){
    try{
        const {unique_user_id}=req.body
        const post=req.body.post
        const post_id=req.params.postId
        Post.update(
            post,
            {where:{
            user_id:unique_user_id,
            id:post_id
        }})
        res.send({message:"Post was edited"})
    }
    catch(e){
        res.send({error:e})
    }
}