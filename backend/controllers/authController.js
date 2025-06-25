const db = require("../prisma/queries");
const bcrypt = require("bcrypt");

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

module.exports = { signUp };
