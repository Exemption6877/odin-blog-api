const { Router } = require("express");
const postController = require("../controllers/postsController");

const postsRouter = Router();

const commentsRouter = require("./commentsRouter");
const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");
postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.post("/", verifyToken, verifyAdmin, postController.createPost);
postsRouter.get("/", postController.getAllPosts);
postsRouter.get("/:id", postController.getPostById);
postsRouter.put("/:id", verifyToken, verifyAdmin, postController.updatePost);
postsRouter.delete("/:id", verifyToken, verifyAdmin, postController.deletePost);

module.exports = postsRouter;
