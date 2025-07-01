const db = require("../prisma/queries");
const { findById } = require("../prisma/services/postsService");

async function createPost(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }

    const { title, content, publishedString } = req.body;
    const published = publishedString === "true";
    const userId = req.user.id;

    await db.posts.create(title, content, published, userId);
    res.status(201).json({ message: "Post created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post." });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await db.posts.getAll();

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found." });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
}

async function getPostById(req, res) {
  try {
    const postId = Number(req.params.id);
    const post = await db.posts.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post." });
  }
}

async function updatePost(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }

    const postId = Number(req.params.id);
    const post = await findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const title = req.body.title === undefined ? post.title : req.body.title;
    const content =
      req.body.content === undefined ? post.content : req.body.content;
    const published =
      req.body.published === undefined
        ? post.published
        : req.body.published === "true";

    const updatedPost = await db.posts.updateById(
      postId,
      title,
      content,
      published
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post." });
  }
}

async function deletePost(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }

    const postId = Number(req.params.id);
    const post = await findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    await db.posts.deleteById(postId);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post." });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
