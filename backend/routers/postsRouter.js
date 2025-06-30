const { Router } = require("express");
const postController = require("../controllers/postsController");

const postsRouter = Router();

const commentsRouter = require("./commentsRouter");
const { verifyToken } = require("../middleware/verifyToken");
postsRouter.use("/:postId/comments", commentsRouter);

postsRouter.post("/", verifyToken, postController.createPost);
postsRouter.get("/", postController.getAllPosts);
postsRouter.get("/:id", postController.getPostById);
postsRouter.put("/:id", verifyToken, postController.updatePost);
postsRouter.delete("/:id", verifyToken, postController.deletePost);

module.exports = postsRouter;
