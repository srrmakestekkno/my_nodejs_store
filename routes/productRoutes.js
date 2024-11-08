// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected routes for managing the cart
router.get("/cart", authMiddleware.authenticate, productController.getCart);
router.post("/cart", authMiddleware.authenticate, productController.addToCart);

module.exports = router;
