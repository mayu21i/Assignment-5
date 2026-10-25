const express = require("express");
const postController = require("./post.controller");

const postRouter = express.Router();

postRouter.post("/posts", postController.createPost);
postRouter.delete("/posts/:postId", postController.deletePost);
postRouter.get("/posts/details", postController.getPostsWithDetails);
postRouter.get("/posts/comment-count",postController.getPostsWithCommentCounts);

module.exports = postRouter;