import {z} from 'zod'
import { db } from '../db'
import { DataTypes } from 'sequelize'
import { User } from './user'

export const Post=db.define("Post",{
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:"id"
        },
        allowNull:false
    },

    title:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    category:{
        type:DataTypes.ENUM,
        values: ["Physical Security",
            "Assault",
            "Fire",
            "Workplace",
            "Data Breach",
            "Legal",
            "Environmental",
            "Customer",
            "Fraud",
            "Health",
            "Fighting",
            "Rioting",
            "Accident"],
        allowNull:false
    },
    location:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    image:{
        type:DataTypes.BLOB('long'),
        allowNull:false,
    },
    image_mime:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{timestamps:true})

Post.belongsTo(User,{
    foreignKey:'user_id'
})

export const Postchema=z.object({
    user_id:z.number().min(1),
    title:z.string().min(1),
    category:z.enum(
        ["Physical Security",
        "Assault",
        "Fire",
        "Workplace",
        "Data Breach",
        "Legal",
        "Environmental",
        "Customer",
        "Fraud",
        "Health",
        "Fighting",
        "Rioting",
        "Accident"]),
        location:z.string().min(1)
})