import { NextResponse } from "next/server"

export function POST ( request ) {
    
    try {
        request.cookies.delete('token')  
        console.log(request.cookies.has('token'))

        return NextResponse.json({
            message: "Sesion Cerrada"
        } , {status : 200})


    } catch (error) {
        console.log( error )
        return NextResponse.json( error.errmsg )
    } 
}