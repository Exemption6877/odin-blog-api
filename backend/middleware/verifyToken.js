const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      req.user = jwt.verify(bearerToken, process.env.JWT_SECRET);
      next();
    } catch (err) {
      return res.status(401).json({ message: "Missing token." });
    }
  } else {
    res.status(401).json({ error: "Invalid token." });
  }
}

function verifyAdmin(req, res, next) {
  const userRole = req.user.role;

  if (!req.user || userRole !== "ADMIN") {
    return res.status(403).json({ message: "Insufficient privileges." });
  }

  next();
}

module.exports = { verifyToken, verifyAdmin };
