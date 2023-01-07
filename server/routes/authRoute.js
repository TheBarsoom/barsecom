const express= require("express")
const { createUser ,loginUser, getallUser,getOneUser,deleteUser,updateUser} = require("../controller/userCtrl")
const { authMiddleware, isAdminMiddleware } = require("../middlewares/authMid")
const router = express.Router()

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/all-users",getallUser)
router.get("/:id",authMiddleware,isAdminMiddleware,getOneUser)
router.delete("/:id", deleteUser)
router.put("/:id",authMiddleware,isAdminMiddleware,updateUser)
module.exports=router

