import  Express  from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import  path  from "path";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB database is connected");
})
.catch((err)=>{
console.log("Something went wrong with DATABASE " , err);
});

const __dirname = path.resolve();

const app = Express()
app.use(Express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing',listingRouter);

app.use(Express.static(path.join(__dirname, '/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


// middleware a function to deal with error or error handling
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server message"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})