import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
export const signup = async (req,res)=>{


    // here we save your signup data to database 
    const {username , email, password,mobile}= req.body;
    const hashedPassword = bcryptjs.hashSync(password,9)
    const newUser = new User({username , email, password:hashedPassword,mobile})
    try {
        await newUser.save();
        res.status(201).json("User Created Successfully");
        
    } catch (error) {
        res.status(500).json(error.message)
    }
   
};