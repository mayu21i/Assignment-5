const { fn, col } = require("sequelize");
const Post = require("./posts.model");
const User = require("../user/users.model");
const Comment = require("../comment/comments.model");


async function createPost(postData){
    const post = new Post(postData);
    await post.save();
    return post; 
}
async function findPostById(id) {
  return await Post.findByPk(id);
}

async function deletePost(post) {
  return await post.destroy();
}
async function findPostsWithDetails(){
    return await Post.findAll(
        {
            attributes: ['id' , 'title'],
            include:[
                {
                    model: User,
                    attributes: ['id' , 'name'],
                },
                {
                    model: Comment ,
                    attributes: ['id' , 'content'],
                },
            ],
        }
    );
}
async function findPostsWithCommentCounts(){
    return await Post.findAll({
        attributes: [
            'id',
            'title',
            [fn('COUNT' , col('Comments.id')), 'commentCount']
        ],
        include: [
            {
                model: Comment,
                attributes: [],
                required: false,
            },
        ],
        group: ['Post.id'],
    });

}


module.exports ={
    createPost,
    findPostById,
    deletePost,
    findPostsWithDetails,
    findPostsWithCommentCounts,
};