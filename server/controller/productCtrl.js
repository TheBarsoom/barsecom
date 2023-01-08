const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { valdiateMongoDbId } = require("../utils/validateMongodbid");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getAllProduct = await Product.find();
    res.json(getAllProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await valdiateMongoDbId(id);
  try {
    const product = await Product.findById({ _id: id });
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await valdiateMongoDbId(id);

  try {
    const deletedProduct = await Product.findByIdAndDelete({ _id: id });
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllProduct = asyncHandler(async (req, res) => {
  try {
    const allDeletedUser = await User.deleteMany();
    res.json({
      message: `Success deleted all user here is list:`,
      allDeletedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const { id } = req.params;
  await valdiateMongoDbId(id);

  console.log(`Put User Controller`);
  // console.log(id);
  console.log(req.user);
  try {
    //   const  updatedUser= await User.findByIdAndUpdate({_id:id},{firstname:req?.body?.firstname,lastname:req?.body?.lastname,email:req?.body?.email,mobile:req?.body?.mobile},{new:true,});

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  deleteAllProduct,
};
