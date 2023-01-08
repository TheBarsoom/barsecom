const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim:true
    },
    slug: {
      type: String,
      required: true,
      unique:true,
      lowercase:true,
    },
    description: {
      type: String,
      required: true,

    },
    price: {
      type: Number,
      required: true,
    },
    quantity:Number,
     
    sold: {
        type: Number,
        default: 0,
      },
  
    images: {
      type: Array,
      default: [],
    },
    color: {
      type: String,
      enum: [`Black`,`Brown`,`Red`],
    },
    brand: {
        type: String,
        enum: [`Apple`,`Redmi`,`Samsung`,`Lenovo`,`Sony`],
      },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    ratings: [{ star:Number,postedby:{type:mongoose.Schema.Types.ObjectId, ref: "User"} }],
    refreshToken:{
      type:String
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);
