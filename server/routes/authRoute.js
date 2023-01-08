const express= require("express")
const { createUser ,loginUser, getallUser,getOneUser,deleteUser,updateUser,blockUser,unblockUser,deleteAllUser, handleRefreshToken, logout} = require("../controller/userCtrl")
const { authMiddleware, isAdminMiddleware } = require("../middlewares/authMid")
const router = express.Router()

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/all-users",getallUser)
router.get("/refresh-token",handleRefreshToken)
router.get("/:id",authMiddleware,isAdminMiddleware,getOneUser)
router.delete("/:id", authMiddleware,isAdminMiddleware,deleteUser)
router.put("/:id",authMiddleware,isAdminMiddleware,updateUser)
router.put("/block-user/:id",authMiddleware,isAdminMiddleware,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdminMiddleware,unblockUser)
router.post("/all-user-delete",authMiddleware,isAdminMiddleware,deleteAllUser)


module.exports=router

