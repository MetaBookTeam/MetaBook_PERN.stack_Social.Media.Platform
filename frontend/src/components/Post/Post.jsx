import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
} from "../../Service/redux/reducers/Posts/postsSlice";

const Post = () => {
  // useDispatch allows us to dispatch actions to the reducers
  const dispatch = useDispatch();
  // useSelector gives us access to the store
  const state = useSelector((state) => {
    return {
      posts: state.posts.posts,
    };
  });

  const [Post, setPost] = useState("");
  return (
    <>
      <div className="post">
        Post
        <input
          type="text"
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default Post;
