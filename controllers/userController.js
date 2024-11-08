const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const USERS_FILE = "./data/users.json";
const JWT_SECRET = "secret";

const readUsersFromFile = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users file:", err);
    return [];
  }
};

const saveUsersToFile = async (users) => {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing to users file:", err);
  }
};

// authenticate the user and send jwt
exports.login = (req, res) => {
  const { email, password } = req.body;

  const users = readUsersFromFile();
  const user = users.find((u) => u.email === email);

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
