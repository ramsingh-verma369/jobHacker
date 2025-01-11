import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in auth middleware", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
}