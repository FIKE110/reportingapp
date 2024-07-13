import "dotenv/config"
import { verify,sign } from "jsonwebtoken";
import { jwtpayload } from "../types/paylod";


export function signJwtSerivce(payload:jwtpayload){
    const jwt=sign(payload,process.env.SECRET_KEY as string,{algorithm:'HS256'})
    return jwt
}

export function verifyJwtService(token:string){
    const paylaod=verify(token,process.env.SECRET_KEY as string)
    return paylaod
}