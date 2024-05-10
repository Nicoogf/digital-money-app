import { NextResponse } from "next/server";
import User from "../../../models/user.model.js"
import { connectMongoDB } from "@/db/db.js";
import { generarCodigoAlfanumerico } from "@/utils/alias.js";
import bcrypt from "bcryptjs"
import { createAccesToken } from "@/utils/jwt.js";


export async function POST ( request  ) {
    connectMongoDB()
    const numeroAleatorio = Math.floor(Math.random() * 1000000) + 1
    
    try {
       const { nombre , email , password ,dni , telefono } = await request.json()

       const passwordHash = await bcrypt.hash( password , 12 )

       const newUser = new User({
            nombre,
            email,
            password : passwordHash ,
            dni,
            telefono,
            cvu : numeroAleatorio ,
            alias: generarCodigoAlfanumerico()
        })

        const userSaved = await newUser.save()
        const token = await createAccesToken( {id : userSaved._id} )    
        
        request.cookies.set('token', token)        

        return NextResponse.json({
            id: userSaved._id,
            nombre : userSaved.nombre,
            email : userSaved. email,
            createdAt : userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })


    } catch (error) {
        console.log( error )
        return NextResponse.json( error.errmsg )
    } 
}