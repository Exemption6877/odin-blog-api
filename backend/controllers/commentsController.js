const db = require("../prisma/queries");

async function createComment(req, res) {
  try {
    const { commentText } = req.body;
    const userId = Number(req.user.id);
    const postId = Number(req.params.postId);

    const post = await db.posts.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    await db.comments.createForPostId(commentText, userId, postId);
    res.status(200).json({ message: "Comment created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment." });
  }
}

async function getAllComments(req, res) {
  try {
    const postId = Number(req.params.postId);
    const comments = await db.comments.getAllByPostId(postId);

    if (comments.length === 0) {
      return res.status(404).json({ error: "No comments found." });
    }

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
}

async function getCommentById(req, res) {
  try {
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.id);

    const post = await db.posts.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const comment = await db.comments.getByIdAndPostId(commentId, postId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
}

async function updateComment(req, res) {
  try {
    const { commentText } = req.body;
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.id);
    const userId = req.user.id;
    const userRole = req.user.role;

    const post = await db.posts.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const comment = await db.comments.getByIdAndPostId(commentId, postId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (comment.userId !== userId && userRole !== "ADMIN") {
      return res.status(403).json({ error: "Insufficient privileges." });
    }

    const updatedComment = await db.comments.updateById(commentId, commentText);
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update comments." });
  }
}

async function deleteComment(req, res) {
  try {
    const commentId = Number(req.params.id);

    const comment = await db.comments.getByIdAndPostId(commentId, postId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    await db.comments.deleteById(commentId, comment.postId);

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment." });
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
