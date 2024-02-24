// Action Types
export const ADD_COMMENT = 'ADD_COMMENT';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const DISLIKE_COMMENT = 'DISLIKE_COMMENT';
export const SHARE_POST = 'SHARE_POST';

// Action Creators
export const addComment = (postId, comment) => ({
  type: ADD_COMMENT,
  payload: {
    postId,
    comment
  }
});

export const likeComment = (postId, commentId) => ({
  type: LIKE_COMMENT,
  payload: {
    postId,
    commentId
  }
});

export const dislikeComment = (postId, commentId) => ({
  type: DISLIKE_COMMENT,
  payload: {
    postId,
    commentId
  }
});

export const sharePost = (postId) => ({
  type: SHARE_POST,
  payload: {
    postId
  }
});