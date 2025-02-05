import express from 'express'
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import cookieParser from 'cookie-parser';
import router from './routes/routes.js';
import cors from 'cors';
import path from "path";
dotenv.config()
const PORT = process.env.PORT || 3001

const __dirname = path.resolve()

const app = express();
app.use(cors({
       origin: "http://localhost:5173",
       credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",router)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend/dist","index.html"))
    })
}




app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB()
})

