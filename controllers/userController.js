exports.getUsers = (req, res) => {
  res.status(200).json({ message: "Returning all users" });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ message: `User ${name} created`, email });
};
