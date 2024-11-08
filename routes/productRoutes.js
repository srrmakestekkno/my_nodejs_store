const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protect product routes with authentication middleware
router.get("/", authMiddleware.authenticate, productController.getProducts);
router.post("/", authMiddleware.authenticate, productController.createProduct);

module.exports = router;
