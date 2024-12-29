import mongoose from "mongoose"
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in mongodb connection", error);
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;