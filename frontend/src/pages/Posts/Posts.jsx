import { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
} from "../../Service/redux/reducers/Posts/postsSlice";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


import Post from "../../components/Post/Post";
import { Container } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Posts() {

  //* Redux
  const dispatch = useDispatch();



  const auth = useSelector((state) => state.auth);



  const posts = useSelector((state) => state.posts.posts);


  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

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

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Item>xs=3</Item>
        </Grid>

        <Grid item xs={5} >
          
          {posts &&
            posts.map((post) => {
              return (
                <Item  key={post.id}>
                  <Post post={post} />
                </Item>
              );
            })}
        </Grid>

        <Grid item xs={3}>
          <Item>xs=3</Item>
        </Grid>
      </Grid>
    </div>
  );
}
