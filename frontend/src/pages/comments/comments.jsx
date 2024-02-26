/* import React, { useState } from 'react';

const Comment = ({commentText }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleShare = () => {
    setShareCount(shareCount + 1);
  };

  return (
    <div>
      <p>{commentText}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
      <button onClick={handleShare}>Share</button>

      <div>
        <p>Likes: {likeCount}</p>
        <p>Dislikes: {dislikeCount}</p>
        <p>Shares: {shareCount}</p>
      </div>
    </div>
  );
};

export default Comment; */


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const CommentComponent = () => {
  const [commentText, setCommentText] = useState('');
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const handleLikeComment = (commentId) => {
    dispatch(likeComment(commentId));
  };

  const getAllComments = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get("http://localhost:5000/comments", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch({
          type: 'COMMENTS_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        console.error('Error fetching comments:', error);
        dispatch({
          type: 'FETCH_COMMENTS_FAILURE',
          payload: error.message,
        });
      }
    };
  };

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post('http://localhost:5000/comments', { text: commentText }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: 'ADD_COMMENT_SUCCESS',
        payload: response.data,
      });
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      dispatch({
        type: 'ADD_COMMENT_FAILURE',
        payload: error.message,
      });
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            <button onClick={() => handleLikeComment(comment.id)}>Like</button>
          </li>
        ))}
      </ul>

      <div>
        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentComponent;
