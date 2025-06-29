const { Router } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signUp);
authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = authRouter;
