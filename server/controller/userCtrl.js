const User =require("../models/userModel")
const asyncHandler = require("express-async-handler")
const { generateHash } = require("../modules/bcrypt")

const createUser=asyncHandler(
    async(req,res)=>{
        const {email}=req.body
        const findUser=await User.findOne({email:email})
        if(!findUser){
            const newUser = await User.create({...req.body, password:await generateHash(req.body.password)})
            res.json(newUser)
        }else{
            throw new Error ("User already exist",)
            
              
          
        
        }
    }
    
)
module.exports={createUser}