const User=require('../model/userModel')
const jwt=require('jsonwebtoken');
const errorHandler = require('../utils/error');
const bcrypt=require('bcrypt')
const uploadImage=async(req,res,next)=>{
try {
    const {file}=req.file
    if (!req.cookies?.access_token) {
       return res.status(401).json({ errorMessage: "No token found" });
     }
   
     if (!req.file) {
       return res.status(400).json({ errorMessage: "No file uploaded" });
     }
     
       console.log("req.file",req.file);
   
       const token=req.cookies.access_token
   const decodedToken= jwt.verify(token, process.env.JWT_SECRET);
   console.log(decodedToken);
   
      const userId=decodedToken.id
      const uploadImage=await User.findOneAndUpdate({_id:userId},{ image: req.file.filename }, { new: true });
      console.log("uploadImage",uploadImage);
   
      res.status(200).json({Image:uploadImage.image})
} catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
}
}

const userProfileUpdate=async(req,res,next)=>{
try {
  if(req.user.id !==req.params.id){
    return next(errorHandler(401,'Youb can Update only Current User'))
  }

  // console.log(req.body,req.params.id);
  // console.log(req.user.id,req.params.id);
  const  hashedPassword=bcrypt.hashSync(req.body.password,10)
  const updateUser=await User .findByIdAndUpdate(req.params.id,{
   $set :{
    username:req.body.username,
    email:req.body.email,
    password:hashedPassword,
   }
  },{
    new:true
  });

  console.log(updateUser);

  if(!updateUser){
    res.status(404).json({error:"User Not Found"});
  }

  const{password,...rest}=updateUser._doc

  return res.status(200).json({message:"user Updated Suceefully",user:rest})
} catch (error) {
  console.error("Error uploading image:", error);
  res.status(500).json({ errorMessage: "Internal server error" });
}
}


// delete user

const deleteUser=async(req,res,next)=>{
  console.log(req.user.id,req.params.id);
  if(req.user.id!==req.params.id){
    return next(errorHandler(401,'You can delete only existing user'))
  }

  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({message:"user deleted"})
  } catch (error) {
    next(error)
  }
}


module.exports={
    uploadImage,
    userProfileUpdate,
    deleteUser
}