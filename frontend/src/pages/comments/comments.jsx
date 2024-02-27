import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { addShare } from "../../Service/redux/reducers/shares/sharesSlice";

const Comments = ({ post }) => {
  // share modal
  const [openShare, setOpenShare] = useState(false);
  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);
  const [contentAdd, setContentAdd] = useState("");
  const [postId, setPostId] = useState(0);

  //* Redux =========================
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const shares = useSelector((state) => state.shares.shares);
  // auth.isLoggedIn, auth.token, auth.userId;
  const { userProfile } = useSelector((state) => state.users);

  // =========================================

  const createNewShare = async (e) => {
    try {
      const share = {
        content: contentAdd,
      };
      const result = await axios.post(
        `http://localhost:5000/posts/shares/${postId}`,
        share,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // console.log(...result.data.result);
      dispatch(addShare(...result.data.result));
      if (result.data.success) {
        // setStatus(true);
        // setMessage(result.data.message);
      }
    } catch (error) {
      if (!error.response.data.success) {
        // setStatus(false);
        // setMessage(error.response.data.message);
      }
      console.log("createNewShare", error);
    }
  };

  // =========================================

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // openLikesModal
  const [postLikes, setPostLikes] = useState([]);
  const [likeIcon, setLikeIcon] = useState(
    post.liked_users?.some((user) => auth.userId * 1 === user * 1) ||
      postLikes.some((like) => auth.userId * 1 === like.user_id * 1)
  );

  // console.log(
  //   "post",
  //   post.id,
  //   "=>",
  //   post.liked_users?.some((user) => auth.userId * 1 === user * 1),
  //   postLikes.some((like) => auth.userId * 1 === like.user_id * 1)
  // );

  const getLikesByPostId = async () => {
    try {
      // console.log('auth.userId', auth.userId)

      // postsRouter.get("/like/:post_id", authentication, getLikesByPostId);
      const likes = await axios.get(
        `http://localhost:5000/posts/like/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // console.log("likes.data.result", likes.data.result);
      setPostLikes(likes.data.result);
    } catch (error) {
      console.log("getLikesByPostId", error);
    }
  };

  // useEffect(() => {
  //   getLikesByPostId();
  // }, []);

  // Likes Modal Toggle ======================
  const [openLike, setOpenLike] = useState(false);

  const openLikesModal = async () => {
    try {
      const likes = await axios.get(
        `http://localhost:5000/posts/like/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setPostLikes(likes.data.result);
      setOpenLike(true);
    } catch (error) {
      console.log("openLikesModal", error);
    }
  };

  const closeLikesModal = () => setOpenLike(false);
  // =========================================

  const [likesCount, setLikeCount] = useState(post.likes * 1);

  const handleLike = async () => {
    setLikeCount(likesCount + 1);
    setLikeIcon(true);

    // postsRouter.post("/like/:post_id", authentication, createNewPostLike);
    try {
      const addLike = await axios.post(
        `http://localhost:5000/posts/like/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // console.log("addLike.data.result", addLike.data.result);
      // getLikesByPostId();
    } catch (error) {
      console.log("handleLike", error);
    }
  };

  // handleDislike =================
  const handleDislike = async () => {
    setLikeCount(likesCount - 1);
    setLikeIcon(false);

    // postsRouter.delete("/like/:post_id", authentication, deletePostLikeById);
    try {
      const removeLike = await axios.delete(
        `http://localhost:5000/posts/like/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // console.log("removeLike.data.result", removeLike.data.result);
      // getLikesByPostId();
    } catch (error) {
      console.log("handleDislike", error);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid container item alignItems="center" xs={4}>
        {likeIcon ? (
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={handleDislike}
          >
            <FavoriteIcon style={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={handleLike}
          >
            <FavoriteBorder />
          </IconButton>
        )}

        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
          onClick={openLikesModal}
        >
          {likesCount} Likes
        </Link>
      </Grid>

      <Grid container item justifyContent="center" alignItems="center" xs={4}>
        <IconButton variant="plain" color="neutral" size="sm">
          <ModeCommentOutlined />
        </IconButton>
        <Link
          // onClick={commentsModal}
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          {post.comments} comments
        </Link>
      </Grid>

      <Grid container item justifyContent="right" alignItems="center" xs={4}>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          onClick={handleOpenShare}
        >
          <SendOutlined />
        </IconButton>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          {post.shares} shares
        </Link>
      </Grid>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          {/* <Face /> */}
          <Avatar size="sm" src={userProfile.image} />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
        />
        <Link underline="none" role="button">
          Post
        </Link>
      </CardContent>

      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* Likes Modal */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={openLike}
        onClose={closeLikesModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Likes
            <hr />
          </Typography>
          {postLikes.toReversed().map((like, i) => (
            <Typography key={i} id="keep-mounted-modal-description">
              <Link
                // component="span"
                underline="hover"
                sx={{ color: "black", my: 0.5 }}
                href={`/page/${like.user_id}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      m: "-1px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                    },
                    mr: 3,
                  }}
                  component="span"
                >
                  <Avatar component="span" src={like.image} />
                </Box>

                {like.user_name}
              </Link>
            </Typography>
          ))}
        </Box>
      </Modal>

      {/*  share modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openShare}
        onClose={handleCloseShare}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openShare}>
          <Grid container sx={style} spacing={2} justifyContent="center">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Share this post
            </Typography>

            <TextField
              fullWidth
              sx={{
                mb: 3,
              }}
              id="standard-basic"
              label="What to say"
              variant="standard"
              onChange={(e) => {
                setContentAdd(e.target.value);
                setPostId(post.id);
              }}
            />

            <Button onClick={createNewShare} variant="outlined">
              Share
            </Button>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default Comments;
