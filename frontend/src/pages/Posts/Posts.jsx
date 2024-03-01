import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

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
import {
  getAllFriends,
  getfriend,
  setUnfollow,
  setFollow,
} from "../../Service/redux/reducers/friend/friendSlice";

import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Loader from "../../components/Loader/Loader";
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
        // console.log(result.data.result);
        dispatch(setPosts(result.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //* ////////////////////////////
  const getUserById = async () => {
    try {
      // console.log('auth.userId', auth.userId)
      const user = await axios.get(
        `http://localhost:5000/users/${auth.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(setUserProfile(...user.data.result));
      // console.log(...user.data.result);
    } catch (error) {
      console.log("getUserById", error);
    }
  };

  //* ////////////////////////////
  const getAllUsers = async () => {
    try {
      // console.log('auth.userId', auth.userId)
      const allUser = await axios.get(`http://localhost:5000/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      dispatch(setUsers(allUser.data.result));
      // console.log(...user.data.result);
      // console.log(user.data.result[0]);
    } catch (error) {
      console.log("getAllUsers", error);
    }
  };
  //* ////////////////////////////
  const getAllFriendsHandler = async () => {
    try {
      // usersRouter.get("/friends", authentication, getAllFriends);
      const allFriends = await axios.get(
        `http://localhost:5000/users/friends`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(getAllFriends(allFriends.data.result));
    } catch (error) {
      console.log("getAllFriendsHandler", error);
    }
  };

  useEffect(() => {
    getUserById();
    getAllPosts();
    getAllUsers();
    getAllFriendsHandler();
  }, []);

  return (
    <div className="posts">
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}

      {/* //* Add new post button //////////////// */}
      <Add />
      <Grid container spacing={5} direction="row" justifyContent="center">
        <Grid
          item
          md={2}
          sx={{ display: { md: "block", sm: "none", xs: "none" } }}
        >
          <SideBar />
        </Grid>

        <Grid item md={6} sm={8} xs={10}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              height: 1000,
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            {posts &&
              posts.toReversed().map((post) => {
                return (
                  <Suspense fallback={<Loader />}>
                    <Post key={post.id} post={post} />
                  </Suspense>
                );
              })}
          </Box>
        </Grid>
        <Grid
          item
          md={3}
          sx={{ display: { md: "block", sm: "none", xs: "none" } }}
        >
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}
