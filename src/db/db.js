import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/digital-money-app")
        console.log("Conexion exitosa a MongoDB")
    } catch (error) {
        console.log("Error al conectar : " , error)
    }
}
