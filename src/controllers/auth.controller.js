import User from "../models/user.model.js";
import validator from "validator";

export const register = async (req,res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (
            [firstName, email, lastName, password].some((field) => field?.trim() === "")
        ){
            return res.status(400).send({
                message: "All fields are required",
                success: false,
            })
        }
        
        if (!validator.isEmail(email)){
            return res.status(400).json({
                message: "Invalid email",
                success: false,
            });
        }

        const userExists = await User.findOne({ email});
        console.log(userExists);
        if(userExists){
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const newUser = await User.create({
            username,
            fullName,
            email,
            password,
        })
        
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            newUser,
        })
    } catch (error) {
        console.log("Erorr in register constructor",error);
        return res.status(500).send({
            message:"Internal server error",
            success:false,
            error,
        });
    }
}