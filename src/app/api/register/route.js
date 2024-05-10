import { NextResponse } from "next/server";
import User from "../../../models/user.model.js"
import { connectMongoDB } from "@/db/db.js";
import { generarCodigoAlfanumerico } from "@/utils/alias.js";

export async function POST ( request ) {
    connectMongoDB()
    const numeroAleatorio = Math.floor(Math.random() * 1000000) + 1
    
    try {
        const { nombre , email , password ,dni , telefono, cvu} = await request.json()

        const newUser = new User({
            nombre,
            email,
            password,
            dni,
            telefono,
            cvu : numeroAleatorio ,
            alias: generarCodigoAlfanumerico()
        })

        const userSaved = await newUser.save()
        console.log( newUser )    
        return NextResponse.json(userSaved)
    } catch (error) {
        console.log( error )
        return NextResponse.json( error.errmsg )
    } 
}