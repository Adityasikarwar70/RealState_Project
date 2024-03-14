import  Express  from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from './routes/auth.route.js'
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB database is connected");
})
.catch((err)=>{
console.log("Something went wrong with DATABASE " , err);
})

const app = Express()
app.use(Express.json());

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);