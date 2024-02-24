import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPost,
  setPostsLikesById,
} from "../../Service/redux/reducers/Posts/postsSlice";


import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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


  // Start Modal new post
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
// End Modal new post
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
          console.log("Hello ",results);
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

  const getAllPostsLikes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/like/1`, {

        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.data.success) {
        setStatus(true);
        dispatch(setPostsLikesById(res.data.result));
      } else throw Error;
    } catch (error) {
    
      setMessage("Error happened while Get Data, please try again");
    }
  };

  useEffect(() => {
    getAllPostsLikes();
  }, []);
  return (
    <div className="posts">
      <h2>POSTS</h2>
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
 <Button onClick={handleOpen}>What's on your mind</Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                     
                    </Typography>
                  </Box>
                </Fade>
              </Modal>

      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={3}>
          <Item>xs=3</Item>
        </Grid>

        <Grid item xs={5}>
          {posts &&
            posts.map((post) => {
              return (
                <Item key={post.id}>
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
