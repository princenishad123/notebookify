import mongoose from "mongoose"
import { config } from "dotenv"
config()
const connectDB = () => {
    
    mongoose.connect(process.env.MONGODB_URI).then((res) => {
        console.log(`mongodb Connected`)
    }).catch((error) => {
        console.log(error.message)
    })
}

export default connectDB