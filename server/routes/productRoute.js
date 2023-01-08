const express = require("express");
const {
  createProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  deleteAllProduct,
} = require("../controller/productCtrl");
const { authMiddleware, isAdminMiddleware } = require("../middlewares/authMid");
const router = express.Router();

router.get("/all-product", getAllProduct);
router.get("/:id", getOneProduct);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.delete("/all-product-delete/", authMiddleware, deleteAllProduct);

module.exports = router;
