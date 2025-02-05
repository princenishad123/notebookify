import jwt from 'jsonwebtoken'

export const generateToken = (userId,res) => {
    try {
    
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });


       res.cookie("token",token,{
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 * 1000,
        sameSite: "strict",
        
    })
        return token;
        
    } catch (error) {
        console.log("failed to generate token" + error

        )
    }
}