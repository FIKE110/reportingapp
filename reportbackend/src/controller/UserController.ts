import { Request,Response } from "express";
import { User } from "../model/user";
import { signJwtSerivce } from "../services/jwt";
import bcrypt from 'bcrypt'

export async function createUser(req:Request,res:Response){
    try{
    const {username,password,email}=req.body
    const data=req.file
    const newUser=await User.create({
        username:username,
        password:password,
        email:email,
        image:data?.buffer,
        image_mime:data?.mimetype,
        image_name:data?.originalname
    })

    if(newUser){
        res.json({username,email,message:"user successfully created"})
    }
    else{
        res.json({error:"could not be created"})
    }}
    catch(e:any){
        res.json({error:e.message})
    }
}


export async function getUser(req:Request,res:Response){
    const {id}=req.body.userId
    const newUser=await User.findOne({
        where:{id:id}
    })

    if(newUser){
        res.json(newUser)
    }
    else{
        res.status(404).json({error:"User not found"})
    }
}

export async function loginUserByAuth(req:Request,res:Response){
    try{
    const {username,password}=req.body
    const user=await User.findOne({where:{username:username}})
    if(user){
        const model=user.toJSON()
        if(await bcrypt.compare(password,model.password)){
            const jwt=signJwtSerivce({id:model.email})
            res.json({token:jwt})
        }
        else{
            res.json({error:"invalid username or password"})
        }
    }
    else{
        res.status(404).json({error:"invalid username or password"})
    }}
    catch(e:any){
        res.json({error:e.message})
    }
}

export async function getUserProfileById(req:Request,res:Response){
    try{
        const {userId} =req.params
        const user:any=await User.findByPk(parseInt(userId))
        if(user){
            res.json({
                username:user.username,
                imageurl:`${user.username}/image`
            })
        }
        else{
            res.json({error:"profile not found"})
        }
    }
    catch(e:any){
        res.json({error:e.message})
    }
}

export async function getUserProfileImageById(req:Request,res:Response){
    try{
        const {username}=req.params
        const user=await User.findOne({where:{username:username}})
        if(user){
            const {image,image_mime}:any=user
            res.setHeader("Content-Type",image_mime)
            res.send(image)
        }
        else{
            res.status(404).json({error:"image not found"})
        }
    }
    catch(e:any){
        res.json({error:e.message})
    }
}