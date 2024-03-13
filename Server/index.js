const express=require('express')
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv').config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

app.listen(3000,()=>{
    console.log("server running!!");
});