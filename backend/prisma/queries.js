const auth = require("./services/authService");
const users = require("./services/usersService");
const posts = require("./services/postsService");
const comments = require("./services/commentsService");

module.exports = { auth, users, posts, comments };
