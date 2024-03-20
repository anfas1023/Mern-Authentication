const errorHandler = require("../../utils/error");
const User=require('../../model/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const generateToken=(email)=>{
    const token=jwt.sign(email,process.env.JWT_SECRET);
    return token
}


const adminLogin=(req,res,next)=>{
    const {email,password}=req.body
try {
    
    if(!email || !password){
        next(errorHandler(401,"Provide Credintial to login"))
    }

    if(email!=='admin@gmail.com' && password!=='123'){
        return res.status(409).json({message:"PLz provide correct Credintials"})
    }else{
        const token=generateToken(email);
        res.cookie('admin_token',token, {
            httpOnly: true,
            // secure: false, 
            // sameSite: 'Lax',
            maxAge: 3600000, 
           })
        .status(200).json({email})
    }
} catch (error) {
    next(error)
}
}


const fetchAllUser=async(req,res,next)=>{
const userData=await User.find();

res.status(201).json(userData)
}

const fetchOneUser = async (req, res) => {
    const { userId } = req.params; 
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { password,_id,createdAt,updatedAt,image, ...rest } = user._doc;
      res.status(200).json(rest);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const adminedituser = async (req, res) => {
    console.log(req.body);
    console.log(req.params.userid);
  
    // Check if necessary data is provided
    if (!req.body.username || !req.body.email) {
      return res.status(400).json({ error: "Provide Username and Email to update user" });
    }
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userid },
        {
          $set: {
            username: req.body.username,
            email: req.body.email
          }
        },
        { new: true }
      );

  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found or cannot update the user" });
      }

      return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };



  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    console.log(req.params);
  
    try {
      if (!userId) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const adminCreateUser=async(req,res)=>{
    const {username,email,password}=req.body

try {
  const userExist=await User.findOne({email})

if(userExist) {
  console.log("user Exist");
  return res.status(404).json({errorMessage:'User Already Exist'})
}else{


  const hashedpassword=bcrypt.hashSync(password,10);

  const newUser=new User(
    {
      username,
      password:hashedpassword,
      email,
    }
  )

  await newUser.save();

  return res.status(200).json({message:'User created sucefully'});
}
} catch (error) {
  return res.status(500).json({errorMessage:'Internal Server Error'})
}
  }

 
  

  
  module.exports = adminedituser;
  
 
  
module.exports={
    adminLogin,
    fetchAllUser,
    fetchOneUser,
    adminedituser,
    deleteUser,
    adminCreateUser,
    
}