import { NextResponse } from "next/server";



export async function POST  ( request ) {
    const { email , password } = await request.json()
    console.log( email , password )
    return NextResponse.json( "Registrando" )
}