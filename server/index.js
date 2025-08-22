import express from "express";
const app = express();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import cors from "cors";

import AuthRouter from "./routes/AuthRouter.js";
const PORT = process.env.PORT || 5000;

const connectMongoDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if(connect){
            console.log(" Database is connected to the server")
        }
    }catch(e){
        console.log(e.error)
    }
}
connectMongoDB();

app.use(cors({
  origin: ['http://localhost:5173', "https://movies-hubs-delta.vercel.app"],
  methods: ['GET', 'POST'],
  credentials: true
}));



app.get("/api", (req, res) => {
  res.send("Backend is running ✅");
});
// api for task


app.use("/api",AuthRouter);


app.listen(PORT,()=>{
    console.log("server is running on the port 5000")
})
