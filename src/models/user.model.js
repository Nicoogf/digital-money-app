import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    nombre : {
        type : String
    },
    apellido: {
        type : String
    },
    dni: {
        type : String,
        unique : true
    },
    email: {
        type : String,
        unique : true
    },
    telefono: {
        type : String,
        unique : true
    },
    cvu: {
        type : String,
        unique : true
    },
    alias: {
        type : String,
        unique : true
    },
    password: {
        type : String
    },
    billetera: {
        type : String
    },
})

export default mongoose.model("User" , userSchema)


