import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// routes
import connectDB from "./config/db.js";
import userRoute from "./routes/auth.route.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use("/api/v1/auth",userRoute);

app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});