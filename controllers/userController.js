const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// TODO put it in a file
const mockedUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
];

const JWT_SECRET = "secret";

exports.login = (req, res) => {
  const { email, mpassword } = req.body;

  const user = mockedUsers.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

exports.getUsers = (req, res) => {
  res.status(200).json({ message: "Returning all users" });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ message: `User ${name} created`, email });
};
