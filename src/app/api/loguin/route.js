import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { connectMongoDB } from "@/db/db";
import { createAccesToken } from "@/utils/jwt";



export async function POST(request) {
    connectMongoDB()

    try {
        const { email, password } = await request.json()
        const userFound = await User.findOne({ email })

        if (!userFound) {
            return NextResponse.json({
                message: "Usuario no encontrado"
            }, { status: 400 })
        }

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) {
            return NextResponse.json({ message: "Credenciales Incorrectas" }, { status: 400 })
        }

        const token = await createAccesToken({ id: userFound._id })
        request.cookies.set('token', token)       

        return NextResponse.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })


    } catch (error) {
        console.log(error)
        return NextResponse.json(error.errmsg)
    }
}