import { Request,Response } from "express";
import { User } from "../model/user";
import { signJwtSerivce } from "../services/jwt";
import { or } from "sequelize";
import bcrypt from 'bcrypt'

export async function createUser(req:Request,res:Response){
    try{
        const {username,password,email,token}=req.body

        const existingUser=await User.findOne({
            where:[or({
                username:username,
            },{email:email})]        
        })


    if(!existingUser){
        const newUser:any=await User.create({
            username:username,
            password:password,
            email:email,
            token:token
        })

        res.status(201).json({username:newUser.username,email:newUser.email,message:"user successfully created"})
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
    const user=await User.findOne({
        where:{id:id}
    })

    if(user){
        res.json(user)
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
            const jwt=signJwtSerivce({id:model.id})
            res.json({token:`${jwt}`})
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

export async function getUserByToken(req:Request,res:Response){
    try{
        const {unique_user_id}=req.body
        const user:any=await User.findByPk(unique_user_id)
        if(user){
            res.json({
                username:user.username,
                email:user.email
            })
        }
        else{
            res.json({error:"profile not found"})
        }
    }
    catch(e){
        console.log(e)
    }
}