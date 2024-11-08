const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";

exports.authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
