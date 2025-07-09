const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const postsRouter = require("./routers/postsRouter");
const authRouter = require("./routers/authRouter");
const usersRouter = require("./routers/usersRouter");
app.use("/posts", postsRouter);
app.use("/", authRouter);

// Admin routes
app.use("/admin/", usersRouter);

app.listen(PORT, () => {
  console.log(`API is online at port ${PORT}`);
});
