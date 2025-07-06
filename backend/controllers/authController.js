const db = require("../prisma/queries");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const { validationResult } = require("express-validator");

async function signUp(req, res) {
  try {
    const { username, password } = req.body;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const user = await db.auth.getByName(username);

    if (user) {
      return res.status(403).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.auth.createUser(username, hashedPassword);
    res.status(200).json({ message: "User has been created." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create user." });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await db.auth.getByName(username);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        res.json({
          token,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not login user." });
  }
}

async function adminLogin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await db.auth.getByName(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "User is not an administrator." });
    }

    jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        res.json({
          token,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not login user." });
  }
}

module.exports = { signUp, login, adminLogin };
