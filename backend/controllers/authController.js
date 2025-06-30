const db = require("../prisma/queries");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

async function signUp(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(username, hashedPassword);
    const user = await db.auth.createUser(username, hashedPassword);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await db.auth.getByName(username);

    if (!user) {
      return new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Error("Invalid Credentials");
    }

    jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      (err, token) => {
        res.json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { signUp, login };
