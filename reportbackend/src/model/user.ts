import { DataTypes } from "sequelize"
import { db } from "../db"

export const User=db.define('User',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    }
},{timestamps:true,freezeTableName:true})