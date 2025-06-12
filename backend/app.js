const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const postsRouter = require("./routers/postsRouter");
app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`API is online at port ${PORT}`);
});
