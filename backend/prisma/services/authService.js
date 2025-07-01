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
    console.error(err);
    throw new Error("Database: Failed to create user.");
  }
}

async function getByName(username) {
  try {
    return await prisma.user.findUnique({ where: { username } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch user.");
  }
}

module.exports = { createUser, getByName };
