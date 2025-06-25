const { Router } = require("express");

const authRouter = Router();

const authController = require("../controllers/authController");

// authRouter.post("/login");
authRouter.post("/signup", authController.signUp);

module.exports = authRouter;
