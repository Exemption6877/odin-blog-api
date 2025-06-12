const { Router } = require("express");
const postController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.post("/", postController.createPost);
postsRouter.get("/", postController.getAllPosts);
postsRouter.get("/:id", postController.getPostById);
postsRouter.put("/:id", postController.updatePost);
postsRouter.delete("/:id", postController.deletePost);

module.exports = postsRouter;
