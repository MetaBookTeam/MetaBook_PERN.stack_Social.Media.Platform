import { useEffect, useState } from "react";
import axios from "axios";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
  setPostsLikesById,
} from "../../Service/redux/reducers/Posts/postsSlice";
import {
  setUsers,
  setUserProfile,
} from "../../Service/redux/reducers/users/usersSlice";

import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";

import Post from "../../components/Post/Post";
import SideBar from "../../components/SideBar/SideBar";
import RightBar from "../../components/RightBar/RightBar";
import Add from "../../components/Add/Add";

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
  // auth.isLoggedIn, auth.token, auth.userId;
  const posts = useSelector((state) => state.posts.posts);
  const { userProfile } = useSelector((state) => state.users);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const getAllPosts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/posts/", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (result.data.success) {
        setStatus(true);
        dispatch(setPosts(result.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error)
        return setMessage(error.response.data.message);
        
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };



  // const getAllPostsLikes = async () => {
  //   try {
  //     //! static end point?? like/1
  //     const res = await axios.get(`http://localhost:5000/posts/like/1`, {
  //       headers: {
  //         Authorization: `Bearer ${auth.token}`,
  //       },
  //     });
  //     if (res.data.success) {
  //       setStatus(true);
  //       dispatch(setPostsLikesById(res.data.result));
  //     } else throw Error;
  //   } catch (error) {
  //     setMessage("Error happened while Get Data, please try again");
  //   }
  // };
  // useEffect(() => {
  // getAllPostsLikes();
  // }, []);

  //* ////////////////////////////
  const getUserById = async () => {
    try {
      console.log('auth.userId', auth.userId)
      const user = await axios.get(
        `http://localhost:5000/users/${auth.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(setUserProfile(...user.data.result));
      console.log(user.data.result);
    } catch (error) {
      console.log("getUserById", error);
    }
  };
  useEffect(() => {
    getUserById();
    getAllPosts();
  }, []);

  return (
    <div className="posts">
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}

      {/* //* Add new post button //////////////// */}
      <Add />

      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
          <SideBar />
        </Grid>

        <Grid item md={5} sm={7} xs={9}>
          {posts &&
            posts.map((post) => {
              return <Post key={post.id} post={post} />;
            })}
        </Grid>

        <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}
