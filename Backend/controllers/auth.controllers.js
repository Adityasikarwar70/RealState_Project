import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // here we save your signup data to database
  const { username, email, password, mobile } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    mobile,
  });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};



export const signin = async(req,res,next) =>{
    const {email,password}= req.body;
    try {
        const validUser = await User.findOne({email})
        if(!validUser) next(errorHandler(404,'User Not Found'))
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) next(errorHandler(401,'Wrong Cridentials'))
        const token = jwt.sign({id:validUser._id},process.env.JWT_KEY)
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUser)
    } catch (error) {
        next(error)
        
    }
}
