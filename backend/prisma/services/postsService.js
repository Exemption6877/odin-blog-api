const prisma = require("../prisma");

// Do statuses with messages instead of console logging

async function getAll() {
  try {
    return await prisma.post.findMany();
  } catch (err) {
    console.log(err);
  }
}

async function findById(id) {
  try {
    return await prisma.post.findUnique({ where: { id: id } });
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
}

async function deleteById(id) {
  try {
    await prisma.post.delete({ where: { id: id } });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAll, create, findById, deleteById, updateById };
