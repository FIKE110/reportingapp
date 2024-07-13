import "dotenv/config"
import { verify,sign } from "jsonwebtoken";
import { jwtpayload } from "../types/paylod";
import "dotenv/config"


export function signJwtSerivce(payload:jwtpayload){
    const jwt=sign(payload,process.env.SECRET_KEY as string,{algorithm:'HS256',expiresIn:process.env.expires})
    return jwt
}

export function verifyJwtService(token:string){
    const paylaod=verify(token,process.env.SECRET_KEY as string)
    return paylaod
}