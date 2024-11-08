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

  const cartItem = await readCartFromFile(userId);
  res.json(cartItem);
};

exports.addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  const cartItems = await readCartFromFile(userId);

  const existingProduct = cartItems.find(
    (item) => item.productId === productId
  );
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cartItems.push({ productId, quantity });
  }

  await saveCartToFile(userId, cartItems);
  res.status(201).json({ message: "Product added to cart", cart: cartItems });
};
