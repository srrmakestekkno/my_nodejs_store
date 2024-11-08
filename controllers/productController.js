exports.getProducts = (req, res) => {
  res.status(200).json({ message: "Returning all products" });
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  res.status(201).json({ message: `Product ${name} created`, price });
};
