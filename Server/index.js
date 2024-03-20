const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const adminrouter=require('./routes/adminRoute')
const path=require('path')
const cors = require("cors");
const cookieOptions = {
  httpOnly: true,
};

app.use(cookieParser(cookieOptions));
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
// const corsOptions ={
//     origin:'http://localhost:5173/', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use("/Server/user", userRouter);
app.use("/Server/auth", authRouter);
app.use('/Server/admin',adminrouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messsage = err.messsage || "Internal Server Error";
  return res.status(statusCode).json({
    sucess: false,
    error: messsage,
    statusCode,
  });
});
app.listen(3000, () => {
  console.log("server running!!");
});
