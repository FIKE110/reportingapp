import { Dialect, Sequelize } from "sequelize"
import "dotenv/config"

export const db=new Sequelize({
    username:process.env.DB_USERNAME as string,
    dialect:process.env.DB_DIALECT as Dialect,
    password:process.env.DB_PASSWORD as string,
    host:process.env.DB_HOST as string,
    database:process.env.DB_DATABASE as string,
    port:process.env.DB_PORT as any as number,
})

export const StartDb=async ()=>{
    try{
    await db.authenticate()
    console.log("Database is connected")
    await db.sync({logging:true,force:process.env.profiles==='dev'})
    }
    catch(e){
        console.log("db not working")
    }
}
