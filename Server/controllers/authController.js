
const User =require('../model/userModel')
const bcrypt=require('bcrypt');
const errorHandler = require('../utils/error');
const jwt=require('jsonwebtoken');
const signup=async(req,res,next)=>{
try {
    const {username,password,email}=req.body
    const hashedPassword=bcrypt.hashSync(password,10);
    const newUser=new User(
     {
         username,
        password: hashedPassword,
         email
     }
    )
 
    await newUser.save();

    res.status(200).json({message:"user Created suceffully"});
} catch (error) {
   next(error);
}
}

const signin=async(req,res,next)=>{
    const {email,password}=req.body
try {
    const validatUser=await User.findOne({email});
    if(!validatUser) return next(errorHandler(404,'User Not Found'));
    const validPassword=bcrypt.compareSync(password,validatUser.password);
    if(!validPassword) return next(errorHandler(401,'Wrorng Creadintail'));
    const token=jwt.sign({id:validatUser._id},process.env.JWT_SECRET);
    const {password:hashedPassword,...rest}=validatUser._doc
    const expirayDate=new Date(Date.now()+60000);
    res.cookie('access_token',token, {
        httpOnly: true,
        // secure: false, 
        // sameSite: 'Lax',
        maxAge: 3600000, 
       })
    .status(200)

    res.json(rest);
 
} catch (error) {
    next(error);
}
}

const getLoggedInUserData=async(req,res,next)=>{
try {
   
    if(!req.cookies?.access_token){

        return res.status(401).json({errorMessage:"no token found"})
    }

    const token=req.cookies.access_token
const decodedToken= jwt.verify(token, process.env.JWT_SECRET);


   const userId=decodedToken.id

   const user=await User.findOne({_id:userId})
   
   return res.status(200).json(user);
} catch (error) {
    console.log("err",error);
    next(error);
}
}


const logout=(req,res)=>{
    res.clearCookie('access_token').status(200).json('Sign Out Sucess')
}



module.exports={
    signup,
    signin,
    getLoggedInUserData,
    logout
}