import bcrypt from 'bcrypt'

export async function hashPassword(password:string){
    const salt=await bcrypt.genSalt(10)
    const hashedpw=await bcrypt.hash(password,salt)
    return hashedpw
}