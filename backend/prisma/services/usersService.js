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

async function getAllComments(id) {
  try {
    return await prisma.comment.findMany({
      where: { userId: id },
      include: {
        post: {
          select: {
            title: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch user comments.");
  }
}

async function deleteUser(id) {
  try {
    await prisma.user.delete({ where: { id: id } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to delete user.");
  }
}

async function getAllPosts(id) {
  try {
    return await prisma.post.findMany({ where: { userId: id } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch user posts.");
  }
}

async function createAdmin(username, password) {
  try {
    return await prisma.user.create({
      data: {
        username: username,
        password: password,
        role: "ADMIN",
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to create user.");
  }
}

module.exports = {
  create,
  getAll,
  getById,
  updateUsername,
  updatePassword,
  getAllComments,
  deleteUser,
  getAllPosts,
  createAdmin,
};
