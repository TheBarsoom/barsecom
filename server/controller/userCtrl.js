const User =require("../models/userModel")
const asyncHandler = require("express-async-handler")
const { generateHash, compareHash } = require("../modules/bcrypt")
const { createToken } = require("../modules/jwt")

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


const loginUser=asyncHandler(
    async(req,res)=>{
        const {email,password}=req.body
        console.log(email,password);
        
        const findUser=await User.findOne({email:email})
        // if(findUser && await findUser.isPasswordMatched(password)){
        // res.json(findUser)
        // }else{
        //     throw new Error("Password is incorrect");
        // }
        
        if(!findUser)  throw new Error ("User does not exist",)

        const isTrust=await compareHash(password,findUser.password)
        console.log(isTrust);

        if (!isTrust) throw new Error("Password is incorrect");
        res.json({
            _id:findUser?._id,
            firstname:findUser?.firstname,
            lastname:findUser?.email,
            mobile:findUser?.mobile,
            // token:await createToken({id:findUser?._id})
            token:await createToken(findUser?._id)

        })
    }
    
)
module.exports={createUser,loginUser}