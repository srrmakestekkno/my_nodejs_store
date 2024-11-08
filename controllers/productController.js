const fs = require("fs").promises;

const CART_FILE = "./data/cart.json";

const readCartFromFile = async () => {
  try {
    const data = await fs.readFile(CART_FILE, "utf8");
    const carts = JSON.parse(data);
    return carts[userId] || [];
  } catch (err) {
    console.error("Error reading cart file:", error);
    return [];
  }
};

const saveCartToFile = async (userId, cartItems) => {
  try {
    const data = await fs.readFile(CART_FILE, "utf8");
    const carts = JSON.parse(data);
    carts[userId] = cartItems;
    await fs.writeFile(CART_FILE, JSON.stringify(carts, null, 2));
  } catch (error) {
    console.error("Error writing to cart file:", error);
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.userId;
  const carts = await readCartFromFile();

  if (!carts[userId]) {
    return res.status(404).json({ message: "Cart not found for this user" });
  }

  res.json(carts[userId]);
};

exports.addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  const carts = await readCartFromFile();

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existingProduct = carts[userId].find(
    (item) => item.productId === productId
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }

  await saveCartToFile(carts);

  res
    .status(201)
    .json({ message: "Product added to cart", cart: carts[userId] });
};

exports.removeFromCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.body;

  const carts = await readCartFromFile();

  if (!carts[userId]) {
    return res.status(404).json({ message: "Cart not found for this user" });
  }

  // Remove the product from the cart
  carts[userId] = carts[userId].filter((item) => item.productId !== productId);

  await saveCartToFile(carts);

  res
    .status(200)
    .json({ message: "Product removed from cart", cart: carts[userId] });
};
