const express = require("express")
const app  = express();
const dotenv = require("dotenv").config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require("./routes/authRoute")
const PORT = process.env.PORT || 4000;

mongoose.set('strictQuery', true);
const dbConnect=require("./config/dbConnect")
dbConnect();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.use("/api/user",authRouter)
app.listen(PORT,()=>{console.log(`SERVER RUNNING PORT: ${PORT}`);})
