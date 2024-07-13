import { Express } from "express";
import express from "express";
import cors from 'cors'
import { Router } from "./router/Router";
import { StartDb } from "./db";
import { User } from "./model/user"
import multer from "multer";


const app:Express=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(Router)
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

app.post("/",(req,res,next)=>{
    next()
}
,upload.single('file'),(req,res)=>{
    res.send("It works")
})

const saveuser=async()=>{
    try{
    await StartDb()
    const user=await User.create({username:"Fortune",password:'fortune',email:"chihurm@gmail.com"})
    const user2=await User.create({username:"Fortuneiyke",password:'fortune112',email:"chihum@gmail.com"})
    console.log(user,user2)
    }
    catch(e){
        console.log(e)
    }
}

saveuser()

app.listen(3000,()=>{
    console.log("Server has started")
})