const express=require('express')
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const userRouter=require('./routes/userRoute');
const adminRouter=require('./routes/authRoute')
const cors=require('cors')
app.use(cors());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});

app.use(express.json())

app.use('/Server/user',userRouter);
app.use('/Server/auth',adminRouter);
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const messsage=err.messsage || 'Internal Server Error'
    return res.status(statusCode).json({
        sucess:false,
        error:messsage,
        statusCode,
    })
})
app.listen(3000,()=>{
    console.log("server running!!");
});