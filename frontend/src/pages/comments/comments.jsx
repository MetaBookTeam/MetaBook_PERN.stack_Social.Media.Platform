import React, { useState } from 'react';

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

export default Comment;


/*

const CommentSection = () => {
  return (
    <div>
      <Comment commentText="This is a great comment!" />
      <Comment commentText="I disagree with this comment." />
    </div>
  );
};

 */