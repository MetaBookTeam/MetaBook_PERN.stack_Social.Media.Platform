import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
} from "../../Service/redux/reducers/Posts/postsSlice";

import Post from "../../components/Post/Post";

export default function Posts() {
  // const { results } = useLoaderData();

  //* Redux
  const dispatch = useDispatch();

  const { auth, posts } = useSelector((state) => {
    return { auth: state.auth, posts: state.posts.posts };
  });
  // console.log("auth ======>", auth);
  // auth.isLoggedIn, auth.token, auth.userId;
  // console.log("all posts ======> ", posts);
  // all posts;

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================
  const getAllPosts = () => {
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((results) => {
        if (results.data.success) {
          setStatus(true);
          // setMessage(results.data.message);
          dispatch(setPosts(results.data.result));
        } else throw Error;
      })
      .catch((error) => {
        if (!error.response.data.success) {
          return setMessage(error.response.data.message);
        }
        setMessage("Error happened while Get Data, please try again");
      });
  };

  //===============================================================

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="posts">
      <h2>POSTS</h2>
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}

      <p>What's on your mind</p>

      {/* {(results) => {
        console.log(results.data.result);
        return (
          <div className="post">
            {results.data.result &&
              results.data.result.map((post) => {
                return (
                  <div key={post.id}>
                    <h3>post {post.id}</h3>
                    <Post post={post} />;
                  </div>
                );
              })}
          </div>
        );
      }} */}
    </div>
  );
}
