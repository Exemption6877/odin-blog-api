const prisma = require("../prisma");

async function getAll() {
  try {
    return await prisma.post.findMany();
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch posts.");
  }
}

async function findById(id) {
  try {
    return await prisma.post.findUnique({ where: { id: id } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch post.");
  }
}

async function create(title, content, createdAt, published, userId) {
  try {
    await prisma.post.create({
      data: {
        createdAt: createdAt,
        published: published,
        title: title,
        content: content,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to create post.");
  }
}

async function updateById(id, title, content, published) {
  try {
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        published: published,
        title: title,
        content: content,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to update post.");
  }
}

async function deleteById(id) {
  try {
    await prisma.post.delete({ where: { id: id } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to delete post.");
  }
}

module.exports = { getAll, findById, create, updateById, deleteById };
