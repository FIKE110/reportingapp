import { Sequelize } from "sequelize"

export const db=new Sequelize({
    username:'postgres',
    dialect:'postgres',
    password:'password',
    host:'localhost',
    database:'reportdb',
    port:5432,
})

export const StartDb=async ()=>{
    try{
    await db.authenticate()
    console.log("Database is connected")
    await db.sync({logging:true})
    }
    catch(e){
        console.log("db not working")
    }
}
