const { Router } = require("express");
const { body } = require("express-validator");

const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.post("/login", authController.login);
authRouter.post(
  "/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters long."),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  authController.signUp
);

// TODO: delete cookie/localstorage
authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = authRouter;
