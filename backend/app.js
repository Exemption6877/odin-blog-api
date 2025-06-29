const express = require("express");
const app = express();

// Auth
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const db = require("./prisma/queries");

const bcrypt = require("bcrypt");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const postsRouter = require("./routers/postsRouter");
const authRouter = require("./routers/authRouter");
const usersRouter = require("./routers/usersRouter");
app.use("/posts", postsRouter);
app.use("/", authRouter);

// Admin routes
app.use("/admin/user", usersRouter);

app.listen(PORT, () => {
  console.log(`API is online at port ${PORT}`);
});
