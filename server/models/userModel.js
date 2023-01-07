const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const { generateHash, compareHash } = require("../modules/bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    address: [{ type:mongoose.Schema.Types.ObjectId, ref: "Address" }],
  },
  { timestamps: true }
);

// userSchema.pre(`save`,async function (next){
//     this.password = await generateHash(this.password)
// })

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return compareHash(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
