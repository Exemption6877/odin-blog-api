const prisma = require("../prisma");

async function getAll() {
  try {
    return await prisma.comment.findMany();
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch comments.");
  }
}

async function getAllByPostId(postId) {
  try {
    return await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch comments.");
  }
}

async function createForPostId(content, userId, postId) {
  try {
    await prisma.comment.create({
      data: {
        content: content,
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to create comment.");
  }
}

async function updateById(id, content) {
  try {
    await prisma.comment.update({
      where: { id: id },
      data: {
        content: content,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to update comment.");
  }
}

async function deleteById(id) {
  try {
    await prisma.comment.delete({
      where: { id: id },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to delete comment.");
  }
}

module.exports = {
  getAll,
  getAllByPostId,
  createForPostId,
  updateById,
  deleteById,
};
