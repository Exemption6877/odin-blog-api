const { Router } = require("express");
const commentsController = require("../controllers/commentsRouter");

const commentsRouter = Router();

commentsRouter.post("/", commentsController.createComment);
commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.get("/:id", commentsController.getCommentById);
commentsRouter.put("/:id", commentsController.updateComment);
commentsRouter.delete("/:id", commentsController.deleteComment);

module.exports = commentsRouter;
