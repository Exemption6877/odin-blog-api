const express = require("express");
const app = express();
require("dotenv/lib/main").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API is online at port ${PORT}`);
});
