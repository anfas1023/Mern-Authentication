const jwt=require('jsonwebtoken')
const errorHandler=require("./error");

 const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log("token",token);

    if(!token) return next(errorHandler(401,'You are not Authenticated!'))

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,'Toke Is Not Valid'))

        req.user=user

        next(); 

    })
}

module.exports=verifyToken