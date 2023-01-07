const express = require("express")
const app  = express();
const dotenv = require("dotenv").config()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

mongoose.set('strictQuery', true);
const dbConnect=require("./config/dbConnect")
dbConnect();
app.use("/",(req,res)=>{
    res.send("Barsoom")
})
app.listen(PORT,()=>{console.log(`SERVER RUNNING PORT: ${PORT}`);})
