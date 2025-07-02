const db = require("../prisma/queries");

// TODO: middleware for role approval instead of if statement here.

async function getAllUsers(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }

    const users = await db.users.getAll();

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found." });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users." });
  }
}

async function getUserById(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }

    const userId = Number(req.params.id);
    const user = await db.users.getById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user." });
  }
}

async function updateUser(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }

    const userId = Number(req.params.id);

    const user = await db.users.getById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const { username } = req.body;

    const updatedUsername = await db.users.updateUsername(userId, username);
    res.status(200).json(updatedUsername);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user." });
  }
}

async function deleteUser(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }
    const userId = Number(req.params.id);

    const user = await db.users.getById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    await db.users.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user." });
  }
}

async function getAllPosts(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }
    const userId = Number(req.params.id);

    const user = await db.users.getById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const posts = await db.users.getAllPosts();

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found." });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user posts." });
  }
}

async function getAllComments(req, res) {
  try {
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }
    const userId = Number(req.params.id);

    const user = await db.users.getById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const comments = await db.users.getAllComments();

    if (comments.length === 0) {
      return res.status(404).json({ error: "No comments found." });
    }

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user comments." });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllPosts,
  getAllComments,
};
