const { Op } = require("sequelize");
const Comment = require("./comments.model");
const User = require("../user/users.model");
const Post = require("../post/posts.model");


async function createComments(comments) {
  return await Comment.bulkCreate(comments);
}
async function findCommentById(id) {
  return await Comment.findByPk(id);
}
async function saveComment(comment) {
  return await comment.save();
}
async function findOrCreateComment(data) {
  return await Comment.findOrCreate({
    where: {
      postId: data.postId,
      userId: data.userId,
      content: data.content,
    },
    defaults: data,
  });
}

function findCommentsByWord(word) {
  return Comment.findAll({
    where: {
      content: { [Op.like]: `%${word}%` },
    },
  });
}


async function countCommentsByWord(word) {
  return await Comment.count({
    where: {
      content: { [Op.like]: `%${word}%` },
    },
  });
}
async function findNewestCommentsByPostId(postId) {
  return await Comment.findAll({
    where: { postId },
    attributes: ["id", "content", "createdAt"],
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
}
async function findCommentDetailsById(id) {
  return await Comment.findByPk(id, {
    attributes: ["id", "content"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Post,
        attributes: ["id", "title", "content"],
      },
    ],
  });
}


module.exports = {
    createComments,
    findCommentById,
    saveComment,
    findOrCreateComment,
    findCommentsByWord,
    countCommentsByWord,
    findNewestCommentsByPostId,
    findCommentDetailsById,
};