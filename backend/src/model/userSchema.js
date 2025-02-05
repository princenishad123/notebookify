import mongoose from "mongoose";
const userSchema = new  mongoose.Schema({
    fullName: {
        type: String,
        trime: true,
    },
    email: {
        type: String,
        unique: true,
        trime: true,
        required: true,
    },
    password: {
        type: String,
        trime: true,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    isCoAdmin: {
        type: Boolean,
        default:false
    }
})

const User = mongoose.model("User", userSchema);
export default User;