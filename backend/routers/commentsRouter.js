const { Router } = require("express");
const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");
const commentsController = require("../controllers/commentsController");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.post("/", verifyToken, commentsController.createComment);
commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.get("/:id", commentsController.getCommentById);
commentsRouter.put("/:id", verifyToken, commentsController.updateComment);
commentsRouter.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  commentsController.deleteComment
);

module.exports = commentsRouter;
