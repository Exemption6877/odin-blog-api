const { Router } = require("express");

const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");

const usersRouter = Router();
const usersController = require("../controllers/userController");
const authController = require("../controllers/authController");

usersRouter.post("/login", authController.adminLogin);

usersRouter.get("/", verifyToken, verifyAdmin, usersController.getAllUsers);
usersRouter.get("/:id", verifyToken, verifyAdmin, usersController.getUserById);
usersRouter.put("/:id", verifyToken, verifyAdmin, usersController.updateUser);
usersRouter.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  usersController.deleteUser
);

module.exports = usersRouter;
