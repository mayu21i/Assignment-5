const express = require("express");
const commentController = require("./comment.controller");

const commentRouter = express.Router();
commentRouter.post("/comments", commentController.createComments);
commentRouter.patch("/comments/:commentId",commentController.updateComment);
commentRouter.post("/comments/find-or-create",commentController.findOrCreateComment);
commentRouter.get("/comments/search", commentController.searchComments);
commentRouter.get("/comments/newest/:postId",commentController.getNewestComments);
commentRouter.get("/comments/details/:id",commentController.getCommentDetails);

module.exports = commentRouter;
