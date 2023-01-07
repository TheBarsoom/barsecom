const mongoose = require("mongoose")
const { generateHash } = require("../modules/bcrypt")
const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

})

// userSchema.pre(`save`,async function (next){
//     this.password = await generateHash(this.password)
// })
module.exports=mongoose.model("User",userSchema)