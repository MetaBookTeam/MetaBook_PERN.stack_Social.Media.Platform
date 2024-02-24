import { ADD_COMMENT, LIKE_COMMENT, DISLIKE_COMMENT, SHARE_POST } from './actions';

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: [...post.comments, action.payload.comment]
            };
          }
          return post;
        })
      };

    case LIKE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === action.payload.commentId) {
                  return {
                    ...comment,
                    likes: comment.likes + 1
                  };
                }
                return comment;
              })
            };
          }
          return post;
        })
      };

    case DISLIKE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === action.payload.commentId) {
                  return {
                    ...comment,
                    dislikes: comment.dislikes + 1
                  };
                }
                return comment;
              })
            };
          }
          return post;
        })
      };

    case SHARE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              shares: post.shares + 1
            };
          }
          return post;
        })
      };

    default:
      return state;
  }
};

export default postReducer;