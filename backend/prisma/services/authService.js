const prisma = require("../prisma");

async function createUser(username, password) {
  try {
    return await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function getByName(username) {
  try {
    return await prisma.user.findUnique({ username });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createUser, getByName };
