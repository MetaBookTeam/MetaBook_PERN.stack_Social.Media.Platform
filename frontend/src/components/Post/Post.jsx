import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
} from "../../Service/redux/reducers/Posts/postsSlice";

const Post = ({ post }) => {
  // useDispatch allows us to dispatch actions to the reducers
  const dispatch = useDispatch();
  // useSelector gives us access to the store
  const posts = useSelector((state) => state.posts.posts);

  return (
    <>
      <div className="post">
        <h3>POST {post.id}</h3>
        <p>{post.content}</p>
      </div>
    </>
  );
};

export default Post;
