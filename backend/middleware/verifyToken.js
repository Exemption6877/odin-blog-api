const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Missing token." });
    }
  } else {
    res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = { verifyToken };
