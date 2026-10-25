const commentRepository = require("./comment.repository");

function makeError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createComments(comments) {
  if (!Array.isArray(comments) || comments.length === 0) {
    throw makeError("A non-empty comments array is required.", 400);
  }

  for (const comment of comments) {
    if (!comment.content || !comment.postId || !comment.userId) {
      throw makeError(
        "Each comment needs content, postId, and userId.",
        400
      );
    }
  }

  await commentRepository.createComments(comments);
}

async function updateComment(id, userId, content) {
  if (!content) {
    throw makeError("Content is required.", 400);
  }

  const comment = await commentRepository.findCommentById(id);

  if (!comment) {
    throw makeError("comment not found.", 404);
  }

  if (!userId || Number(userId) !== Number(comment.userId)) {
    throw makeError("You are not authorized to update this comment.", 403);
  }

  comment.content = content;
  await commentRepository.saveComment(comment);
}

async function findOrCreateComment(data) {
  const { postId, userId, content } = data;

  if (!postId || !userId || !content) {
    throw makeError("postId, userId, and content are required.", 400);
  }

  const [comment, created] =
    await commentRepository.findOrCreateComment({
      postId,
      userId,
      content,
    });

  return { comment, created };
}
async function searchComments(word) {
  if (!word) {
    throw makeError("Search word is required.", 400);
  }

  const [comments, count] = await Promise.all([
    commentRepository.findCommentsByWord(word),
    commentRepository.countCommentsByWord(word),
  ]);

  return { comments, count };
}
async function getNewestComments(postId) {
  return await commentRepository.findNewestCommentsByPostId(postId);
}

async function getCommentDetails(id) {
  return  await commentRepository.findCommentDetailsById(id);
}

module.exports = {
    createComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails,
};