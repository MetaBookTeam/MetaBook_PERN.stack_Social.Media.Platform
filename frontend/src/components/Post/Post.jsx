<<<<<<< HEAD
import React, { useState, useEffect } from "react"
import axios from "axios";
// import useDispatch and useSelector to dispatch and subscribe to the store
=======
import { useState } from "react";

>>>>>>> 08b873e18331857471e10e9d28be84cdb037f8eb
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
