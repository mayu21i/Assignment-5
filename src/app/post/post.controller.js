const postService = require("./post.service");

async function createPost(req , res , next){
    try{
        await postService.createPost(req.body);
        return res.status(201).json({
            message: "Post created successfully.",
        });

    }catch(error){
        next(error);
    }
}
async function deletePost(req, res, next) {
    try {
      await postService.deletePost(req.params.postId, req.body.userId);

      return res.status(200).json({
        message: "Post deleted.",
      });
    } catch (error) {
      next(error);
    }
}
async function getPostsWithDetails(req, res, next) {
    try {
      const posts = await postService.getPostsWithDetails();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
}
async function getPostsWithCommentCounts(req, res, next) {
    try {
      const posts = await postService.getPostsWithCommentCounts();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    createPost,
    deletePost,
    getPostsWithDetails,
    getPostsWithCommentCounts,
};