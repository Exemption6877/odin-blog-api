const { Router } = require("express");

const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
authRouter.post("/signup", authController.signUp);
authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = authRouter;
