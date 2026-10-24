const User = require("../../user/users.model");
const Post = require("../../post/posts.model");
const Comment = require("../../comment/comments.model");

User.hasMany(Post , {foreignKey: 'userId'});
Post.belongsTo(User , {foreignKey: 'userId'});

Post.hasMany(Comment , {foreignKey: 'postId'});
Comment.belongsTo(Post ,{foreignKey: 'postId'});

User.hasMany(Comment , {foreignKey: 'userId'});
Comment.belongsTo(User , {foreignKey: 'userId'});

module.exports = { User, Post, Comment };