import User from "../model/userSchema.js";
import jwt from 'jsonwebtoken'
const protectedRoute = async(req,res,next) => {
    try {

        const token = req.cookies['token'];
        if (!token) return res.status(400).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) return res.status(400).json({ message: "Unauthorized user" });
        
        const user = await User.findById(decoded.userId).select('-password');
 

     

        if (!user) return res.status(400).json({ message: "user not found" });
        
        req.user = user;

        next()
    
        
    } catch (error) {
        console.log(`error in protected route ${error}`)
    }
}

export default protectedRoute