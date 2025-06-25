const prisma = require("../prisma");

async function create(username, password, role) {
  try {
    return await prisma.user.create({
      data: {
        username: username,
        password: password,
        role: role,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function getAll() {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    console.log(err);
  }
}

async function getById(id) {
  try {
    return await prisma.user.findUnique({ id });
  } catch (err) {
    console.log(err);
  }
}

async function updateUsername(id, username) {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        username: username,
      },
    });
  } catch (err) {
    throw new Error("Database: Could not update username", err);
  }
}

async function updatePassword(id, password) {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        password: password,
      },
    });
  } catch (err) {
    throw new Error("Database: Could not update password", err);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  updateUsername,
  updatePassword,
};
