const postRepository = require("./post.repository");

function makeError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createPost(data){
    const{title, content , userId} = data;

    if (!title || !content || !userId) {
        throw makeError("Title, content, and userId are required.", 400);
    }
    return postRepository.createPost({title , content , userId});  
}

async function deletePost(id, requesterId) {
  const post = await postRepository.findPostById(id);

  if (!post) {
    throw makeError("Post not found.", 404);
  }

  if (!requesterId || Number(requesterId) !== Number(post.userId)) {
    throw makeError("You are not authorized to delete this post.", 403);
  }

  await postRepository.deletePost(post);
}

async function getPostsWithDetails(){
    const posts = await postRepository.findPostsWithDetails();

    return posts.map(post => {
        const postData = post.toJSON();

        return {
            id: postData.id ,
            title: postData.title,
            user: postData.User ?
            {
                id: postData.User.id,
                name: postData.User.name,
            }
            : null,
            comments: (postData.Comments || []).map((comment) =>({
                id: comment.id ,
                content: comment.content,

            })),
        };
    });
}

async function getPostsWithCommentCounts(){
    const posts = await postRepository.findPostsWithCommentCounts();

    return posts.map((post) => {
        const postData = post.toJSON();

        return{
            id: postData.id,
            title: postData.title,
            commentCount: postData.commentCount ,
        };
    });
}


module.exports = {
    createPost,
    deletePost,
    getPostsWithDetails,
    getPostsWithCommentCounts, 
};