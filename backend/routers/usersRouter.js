const { Router } = require("express");

const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");

const usersRouter = Router();
const usersController = require("../controllers/userController");
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

usersRouter.get("/", verifyToken, verifyAdmin, usersController.getAllUsers);
usersRouter.get("/:id", verifyToken, verifyAdmin, usersController.getUserById);
usersRouter.put("/:id", verifyToken, verifyAdmin, usersController.updateUser);
usersRouter.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  usersController.deleteUser
);

// TODO: Add ability to edit, delete, update
usersRouter.get(
  "/:id/posts/",
  verifyToken,
  verifyAdmin,
  usersController.getAllPosts
);
usersRouter.get(
  "/:id/comments/",
  verifyToken,
  verifyAdmin,
  usersController.getAllComments
);

module.exports = usersRouter;
