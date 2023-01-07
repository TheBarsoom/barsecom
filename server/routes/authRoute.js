const express= require("express")
const { createUser ,loginUser, getallUser} = require("../controller/userCtrl")
const router = express.Router()

router.post("/register",createUser)
router.post("/login",loginUser)
router.post("/all-users",getallUser)
module.exports=router

