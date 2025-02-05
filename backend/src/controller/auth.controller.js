import User from "../model/userSchema.js"
import bcrypt from 'bcrypt';
import {generateToken} from "../lib/generateToken.js"
export const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email) return res.status(400).json({message:"Email is Required !"})
        if (!password) return res.status(400).json({ message: "Password is Required !" })
        
        const isExist = await User.findOne({ email });

        if (!isExist) return res.status(400).json({ message: "Invalid Email or Password" });

        const isPassowrdMatch = await bcrypt.compare(password, isExist.password);

        if (!isPassowrdMatch) return res.status(400).json({ message: "Invalid Email or Password" });

        const token = await generateToken(isExist._id,res)
         
        return res.status(200).json({
            token: token,
            email: isExist.email,
            isAdmin:isExist.isAdmin,
            isCoAdmin:isExist.isCoAdmin,
            fullName:isExist.fullName,
        })


        
    } catch (error) {
        console.log(`error in login ${error.message}`)
        return res.status(400).json({message:"Server error try again"})
    }
}

export const signupController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
            if(!email) return res.status(400).json({message:"Email is Required !"})
        if (!password) return res.status(400).json({ message: "Password is Required !" })
        if (!fullName) return res.status(400).json({ message: "Full Name is Required !" })
        
        
        const isExist = await User.findOne({ email });
        if (isExist) return res.status(400).json({ message: "This email already Registered" });
        

         const hashedPassword = await bcrypt.hash(password,10)

        const userRef = new User({ fullName, email, password: hashedPassword });

        await userRef.save()

         return res.status(200).json({
           message:"User created Success"
        })


        
    } catch (error) {
         console.log(`error in sign-up ${error.message}`)
        return res.status(400).json({message:"Server error try again"})
    }
}

export const authCheck = async (req,res) => {
    try {

        res.status(200).json(req.user)
        

        
    } catch (error) {
        console.log(`error in check auth ${error}`)
    }
}
export const logout = async (req,res) => {
    try {
       res.cookie("token", "", {
          maxAge:0
       })
       
       return res.status(200).json({
           message:"your are log out"
       })
   } catch (error) {
       console.log(`error in logout : ${error.message}`)
       res.status(400).json({message:"internal server error"})
   }
}

export const getAllUsers = async(req,res) => {
    try {
        const user = await User.find().select('-password');
        if (!user) return res.status(400).json({ message: "no users" });

       return res.status(200).json(user)
    } catch (error) {
        console.log(`error in get user ${error.message}`)
    }
}