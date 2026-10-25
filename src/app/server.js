const express = require("express");
const sequelize = require("./common/db/connections");
const userRouter = require("./user/user.route");
const postRouter = require("./post/post.route");
const commentRouter = require("./comment/comment.route");
require("./common/db/associations");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ message: "Email already exists." });
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Something went wrong.",
  });
});
async function startServer() {
  try {
    await sequelize.sync();
    console.log("Users, Posts, and Comments tables are ready");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database setup failed:", error.message);
  }
}

startServer();