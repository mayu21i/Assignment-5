const commentService = require("./comment.service");

async function createComments(req, res, next) {
    try {
      await commentService.createComments(req.body.comments);

      return res.status(201).json({
        message: "comments created.",
      });
    } catch (error) {
      next(error);
    }
}
 async function updateComment(req, res, next) {
    try {
      const { userId, content } = req.body;

      await commentService.updateComment(
        req.params.commentId,
        userId,
        content
      );
      return res.status(200).json({
        message: "Comment updated.",
      });
    } catch (error) {
      next(error);
    }
}
 async function findOrCreateComment(req, res, next) {
    try {
      const result = await commentService.findOrCreateComment(req.body);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
}
async function searchComments(req, res, next) {
    try {
      const { word } = req.query;
      const result = await commentService.searchComments(word);

      if (result.count === 0) {
        return res.status(404).json({ message: "no comments found." });
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
}

 async function getNewestComments(req, res, next) {
    try {
      const comments = await commentService.getNewestComments(
        req.params.postId
      );

      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
}

 async function getCommentDetails(req, res, next) {
    try {
      const comment = await commentService.getCommentDetails(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: "no comment found" });
      }

      return res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
}


module.exports = {
    createComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails,
};


