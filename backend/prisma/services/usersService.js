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
    console.error(err);
    throw new Error("Database: Failed to create user.");
  }
}

async function getAll() {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch all users.");
  }
}

async function getById(id) {
  try {
    return await prisma.user.findUnique({ id });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch user.");
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
    console.error(err);
    throw new Error("Database: Failed to update username.");
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
    console.error(err);
    throw new Error("Database: Failed to update user password.");
  }
}

module.exports = {
  create,
  getAll,
  getById,
  updateUsername,
  updatePassword,
};
