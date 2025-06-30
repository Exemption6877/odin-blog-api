const db = require("../prisma/queries");
const { findById } = require("../prisma/services/postsService");

async function createPost(req, res) {
  try {
    const { title, content, publishedString } = req.body;
    const published = publishedString === "true";
    const now = new Date();
    const userId = req.user.id;
    console.log(userId);

    await db.posts.create(title, content, now, published, userId);
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.log(err);
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await db.posts.getAll();
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
}

async function getPostById(req, res) {
  try {
    const postId = Number(req.params.id);
    const post = await db.posts.findByIdyId(postId);
    res.json(post);
    //
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(req, res) {
  try {
    const postId = Number(req.params.id);
    const post = await findById(postId);
    console.log(post);
    const title = req.body.title === undefined ? post.title : req.body.title;
    const content =
      req.body.content === undefined ? post.content : req.body.content;
    const published =
      req.body.published === undefined ? post.published : !post.published;

    res.json(await db.posts.updateById(postId, title, content, published));
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(req, res) {
  try {
    const postId = Number(req.params.id);
    const userRole = req.user.role;
    console.log(userRole);

    if (userRole !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Error: user is not administrator" });
    }
    await db.posts.deleteById(postId);
    res.status(201).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
