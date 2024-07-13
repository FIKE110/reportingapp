import { Express, Request, Response } from "express";
import express from "express";
import cors from 'cors'
import { Router } from "./router/Router";
import { StartDb } from "./db";
import 'dotenv/config'
import multer from "multer";

const storage=multer.memoryStorage(
    /*{
    destination:'upload/',

    filename:(req,file,cb)=>{
        cb(null,file.originalname)
} }*/
)

const upload=multer({storage:storage,
    
    fileFilter:(req,file,cb)=>{
        const allowTypes=["image/jpeg","image/png","image/jpg"]
        if (allowTypes.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(new Error("Invalid filetype"))
        }
    },
    limits:{
        fileSize:1024*1024*15
    }
})


const app:Express=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(upload.single('file'))
app.use(Router)
StartDb()

app.get("/",(req:Request,res:Response)=>{
    res.json({message:"Welcome to my reporting app api"})
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server has started")
})