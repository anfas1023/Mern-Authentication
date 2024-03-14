
const User =require('../model/userModel')
const bcrypt=require('bcrypt')
const signup=async(req,res,next)=>{
try {
    const {username,password,email}=req.body
    console.log("user",req.body);
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new User(
     {
         username,
        password: hashedPassword,
         email
     }
    )
 
    await newUser.save();

    res.status(200).json({message:"user Created suceffully"})
} catch (error) {
   next(error);
}
}

module.exports={
    signup
}