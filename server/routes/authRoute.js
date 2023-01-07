const express= require("express")
const { createUser ,loginUser, getallUser,getOneUser,deleteUser,updateUser} = require("../controller/userCtrl")
const router = express.Router()

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/all-users",getallUser)
router.get("/:id",getOneUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)
module.exports=router

