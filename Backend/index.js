import  Express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB database is connected");
})
.catch((err)=>{
console.log("Something went wrong with DATABASE" , err);
})




const app = Express()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})