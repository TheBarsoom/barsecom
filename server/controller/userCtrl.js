const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateHash, compareHash } = require("../modules/bcrypt");
const { createToken,checkToken } = require("../modules/jwt");
const { valdiateMongoDbId } = require("../utils/validateMongodbid");
const { createRefreshToken } = require("../modules/refreshtoken");

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
  if (isTrust) {
    const refreshToken = await createRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie(`refreshToken`,refreshToken,{
      httpOnly:true,
      maxAge:72*60*60*100,
    })
  }
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

const logout = asyncHandler(async (req, res) => {


  try {
    const cookie = req.cookies
    if(cookie?.refresh_token) throw new Error(`no refresh token in Cookie `)
    const refreshToken=cookie.refreshToken;
    const user=await User.findOne({refreshToken})
    if(!user){
      res.clearCookie("refreshToken",{httpOnly:true,secure:true,})
      return res.sendStatus(204)
    }
    await User.findOneAndUpdate(refreshToken,{
      refreshToken:"",
    })
    await res.clearCookie("refreshToken",{httpOnly:true,secure:true,})
    return res.sendStatus(204)
   
  } catch (error) {
    throw new Error(error);
  }
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
  const { id } = req.params;
  await valdiateMongoDbId(id);
  try {
    const user = await User.findById({ _id: id });
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await valdiateMongoDbId(id);

  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    res.json(deletedUser);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteAllUser = asyncHandler(async (req, res) => {

  try {
    const allDeletedUser = await User.remove();
    res.json({message:`Success deleted all user here is list:`,allDeletedUser});
  } catch (error) {
    throw new Error(error);
  }
});


const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await valdiateMongoDbId(id);

  console.log(`Put User Controller`);
  // console.log(id);
  console.log(req.user);
  try {
    //   const  updatedUser= await User.findByIdAndUpdate({_id:id},{firstname:req?.body?.firstname,lastname:req?.body?.lastname,email:req?.body?.email,mobile:req?.body?.mobile},{new:true,});

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body, password: await generateHash(req?.body?.password) },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await valdiateMongoDbId(id);

  try {
    const blockedUser = await User.findByIdAndUpdate(id, { isBlocked: true });
    res.json({ message: `User Successfully Blocked`, blockedUser });
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await valdiateMongoDbId(id);

  try {
    const unblockedUser = await User.findByIdAndUpdate(id, {
      isBlocked: false,
    });
    res.json({ message: `User is Unblocked successfully`, unblockedUser });
  } catch (error) {
    throw new Error(error);
  }
});



const handleRefreshToken = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // await valdiateMongoDbId(id);
  const cookie=req.cookies
  console.log(cookie);
  try {
    if(!cookie?.refreshToken) throw new Error(`There is NO REFRESH TOKEN in COOKIES`)
    const refreshToken=await cookie.refreshToken;
    console.log(refreshToken);
    const user =await User.findOne({refreshToken})
    if(!user) throw new Error(`No Refresh Token present in database or not matched`)
    // res.json({message:`User of RefreshToken:`,user})
   const matchRefreshToken= await checkToken(refreshToken)
   if(!matchRefreshToken) 
    throw new Error(`There is something wrong with refresh token`)
    const accessToken= await createToken(user?._id)
   
  //  console.log(checkRefreshToken);
  //  res.json(checkRefreshToken)
  res.json({message:`Access Token`,accessToken})
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createUser,
  loginUser,
  getallUser,
  getOneUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  deleteAllUser,
  handleRefreshToken,
  logout
};
