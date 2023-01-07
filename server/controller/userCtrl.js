const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateHash, compareHash } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create({
      ...req.body,
      password: await generateHash(req.body.password),
    });
    res.json(newUser);
  } else {
    throw new Error("User already exist");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const findUser = await User.findOne({ email: email });
  // if(findUser && await findUser.isPasswordMatched(password)){
  // res.json(findUser)
  // }else{
  //     throw new Error("Password is incorrect");
  // }

  if (!findUser) throw new Error("User does not exist");

  const isTrust = await compareHash(password, findUser.password);
  console.log(isTrust);

  if (!isTrust) throw new Error("Password is incorrect");
  res.json({
    _id: findUser?._id,
    firstname: findUser?.firstname,
    lastname: findUser?.email,
    mobile: findUser?.mobile,
    // token:await createToken({id:findUser?._id})
    token: await createToken(findUser?._id),
  });
});

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneUser = asyncHandler(async (req, res) => {
    const {id}=req.params
    try {
      const  user= await User.findById({_id:id});
      res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  });

  const deleteUser = asyncHandler(async (req, res) => {
    const {id}=req.params
    try {
      const  deletedUser= await User.findByIdAndDelete({_id:id});
      res.json(deletedUser);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateUser = asyncHandler(async (req, res) => {
    const {id}=req.params

    try {
    //   const  updatedUser= await User.findByIdAndUpdate({_id:id},{firstname:req?.body?.firstname,lastname:req?.body?.lastname,email:req?.body?.email,mobile:req?.body?.mobile},{new:true,});
     
    const updatedUser= await User.findByIdAndUpdate(id,req.body,{new:true})
    res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = { createUser, loginUser, getallUser,getOneUser,deleteUser,updateUser };
