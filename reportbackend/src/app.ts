import { Express, Request, Response } from "express";
import express from "express";
import cors from 'cors'
import { Router } from "./router/Router";
import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging'
import { StartDb } from "./db";
import 'dotenv/config'
import multer from "multer";


initializeApp({
    credential: cert({
        "type": "service_account",
        "project_id": "bingcompersonal",
        "private_key_id": "e33a6a183b4789d6c9258d9dddd8126558226b4e",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSgg3GsFjRsyqb\nK7zSa/vhwmRVGPUQC4gbPGLujHfm+2ryFCjnvhXCBlH9JLwCLF80wk+hat6FPMVb\nE+jPbCnJ4MGZoQk/zWuBSQenFFD/+ElLd41+Y4RQLyt9lhm1YT86n9B7n+Mg+waf\naEIyijCiG6Cv7jQkAK7kzce5oz5euoFLy0nVIwNNXgyt31j4EBF/D4wcaOFD102h\nu77uml+5W6iIbIkanBDQLYISZ5ODVG5VbfmeDYmXhlxa4cQFt9EaTQvfzqIB0r+p\nYgFz5foeBMX0DQRYYjn7qu4IDOQkQXjwxi/7wUstjRw3mFvoujX9MGPzqUUNBrGP\nlo7uaoXPAgMBAAECggEAGB5q8Cu144fQWs0/f5ChXdAnvk6mgWa0mG8/hi//yTnY\nqFOjTEthv5hUxQzYGq99WO0oONWkHmEbyFultwgCdSaYGJeHM0a5DQadyOayUwFn\n55Gd7JGrhZvOWBVu1ApXY2pN4xw2QwawV2vNgg535SgRMwVO9iJaqHYsDCaQrP1d\nSoxX2mf5D6VTqAbOqia2W6Ob1NxbpOr4uO4He5tpr4lcj41sTD1oz9xzrnTXwwlS\n8FQ8wVjVNc+cIlq162uG8O27VW0+LbiQjSVKNHNVzQ2nyJt/3yqfAxiKOCu2H+Do\nMZzsgns/2oZbB0RTXUlbVvO6Q0p3cISVc60GlUn7EQKBgQDODWB9C3Sbu7zk3s5W\n6iD7SdHjMymJBj4yRRVku0zcb1mcDHAN8fq5pp+CDubfm02ZezxjQCyvI9cdQVWA\ndfEBo+JGrMq0KeN/eY2Ik3pCqx75rftnW7yOD3teJrm1emUnRSpX/GWH9t4ZwaDk\n2Dt9Z7sT7ZF+mXIjpejw8gZK+QKBgQC2BaUjI7V89OvkIOqluvLY7yxZ3Mkq/Cps\nxkrM6NjiJ4GtvbBpwB2sXNkcD+x4NbvBzpw9/YFoF42yUrxakxaA9b+jgH80aTn2\nnROsxpF8QyV2tGugGmn3z6DIsQpUqVyRAuyugvV8y22+reKFqpESULeOQvYWiI4f\n86Hv1u+BBwKBgBonyoq07I1kLFslCS4xNBSRz0m20dvp5fU9nbSWrfABVm+fiI3M\nnJX6V58LwzS5IwWLhiPXHpTwyLqW84KF9hzOL8fm4SgzdQRWaqfeiJNz40+wTQxW\nsb2aq39NDR/DNJnihrh6emzi4liEoqbJ5+tIQpAKBQD7+2gZBFOpdTEJAoGBAKI9\nGdneRC+iZncp17vsi/RMCi32mt/Tb0UQ4S8PA/Ff4Tgo8QrxEAHHqERY9R6YVkgC\njkS6phNPmx6sm/HnVJGReUSUjcz7VYy4qQbA3n/xoXzSh3Nm17jnuZnoIxse8cDW\n6HsLgx++eo0Qk+0sAK5gf5svmASxpmxYTahm3YcVAoGBAMNNWJi9v61CFgmjb5w1\n+lSh44zfGTLqRa4rTuhydxtkBKxDG019uNa7eic8e3Ub3HIOJNsQ4ej+3WWxo6D2\ndCxEQokKgWkJG0f+2koAGedvOMfgR83OJdEYrfMWhi20kJd2aK28gDG8Yeu2eFSU\ngMcPLTdmLGtTIy9bb2w2rd7O\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-w4gzc@bingcompersonal.iam.gserviceaccount.com",
        "client_id": "115532725090974597128",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-w4gzc%40bingcompersonal.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      } as any)
  });

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

app.post('/send-global-notification', async (req, res) => {
    const { title, body, tokens } = req.body;
  
    const message = {
      notification: {
        title: title,
        body: body
      },
      tokens: ['cfJ_WnTZRFOLHH90eLy2fr:APA91bGerthpr_32iMrXfbfWZRforoyuJ64X-ZqVID0rrum61OdBJaem3AKJfz8WlZIWBTAyMRY6_RkRnfHoGxNzFOaRdyarJmfpUNRGrzOJpGBeA0vQp6xXX1xT4X31tvLi79H7JIry'] // Array of device tokens
    };
  
    try {
      const response = await getMessaging().sendMulticast(message);
      res.status(200).send(`Successfully sent ${response.successCount} messages and ${response.failureCount} failed.`);
    } catch (error) {
      res.status(500).send('Error sending notification: ' + error);
    }
  });

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server has started")
})