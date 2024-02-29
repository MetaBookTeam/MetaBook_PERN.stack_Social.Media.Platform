import React from "react";
import { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Fade from "@mui/material/Fade";
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

import { addShare } from "../../Service/redux/reducers/shares/sharesSlice";
import { addComment } from "../../Service/redux/reducers/comments/commentsSlice";

const Comments = ({ values }) => {
  const navigate = useNavigate();
  const { post, modalStyle } = values;

  //* Redux =========================
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const shares = useSelector((state) => state.shares.shares);
  // auth.isLoggedIn, auth.token, auth.userId;
  const { userProfile } = useSelector((state) => state.users);
  const { comments, commentLike, shares } = useSelector(
    (state) => state.comments
  );

  // =========================================
  const [contentAdd, setContentAdd] = useState("");

  const createNewShare = async (e) => {
    try {
      const share = {
        content: contentAdd,
      };
      const result = await axios.post(
        `http://localhost:5000/posts/shares/${post.id}`,
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

  // Collapse Comments List ===================================

  const [collapseComments, setCollapseComments] = useState(false);
  const [postComments, setPostComments] = useState([]);

  const handleCommentsModal = async (e) => {
    setCollapseComments((prev) => !prev);

    try {
      //*  getCommentsByPostId ///////////////////
      // commentsRouter.get("/:post_id/comments", authentication,getCommentsByPostId);
      const comments = await axios.get(
        `http://localhost:5000/comments/${post.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (comments.data.success) {
        setPostComments(comments.data.result);
      } else {
        setPostComments([]);
      }
    } catch (error) {
      console.log("getCommentsByPostId", error);
    }
  };
  // =========================================

  // openLikesModal
  const [postLikes, setPostLikes] = useState([]);
  const [likeIcon, setLikeIcon] = useState(
    post.liked_users?.some((user) => auth.userId * 1 === user * 1) ||
      postLikes.some((like) => auth.userId * 1 === like.user_id * 1)
  );

  // Likes Modal Toggle ======================
  const [openLike, setOpenLike] = useState(false);
  const closeLikesModal = () => setOpenLike(false);

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

  // =========================================
  // add share post to your profile modal

  const [openAddShare, setOpenAddShare] = useState(false);
  const handleOpenAddShare = () => setOpenAddShare(true);
  const handleCloseAddShare = () => setOpenAddShare(false);

  // =========================================
  // openSharesModal
  const [postShares, setPostShares] = useState([]);
  const [shareIcon, setShareIcon] = useState(
    post.shared_users?.some((user) => auth.userId * 1 === user * 1) ||
      postShares.some((share) => auth.userId * 1 === share.user_id * 1)
  );
  // shares Modal Toggle ======================
  const [openShare, setOpenShare] = useState(false);
  const closeSharesModal = () => setOpenShare(false);

  const openSharesModal = async () => {
    try {
      // postsRouter.get("/shares/:post_id", authentication, getShareByPostId);
      const shares = await axios.get(
        `http://localhost:5000/posts/shares/by_post/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setPostShares(shares.data.result);
      setOpenShare(true);
    } catch (error) {
      console.log("openSharesModal", error);
    }
  };

  // =========================================
  //* Add new comment
  const [newComment, setNewComment] = useState("");
  const [commentsCount, setCommentsCount] = useState(post.comments * 1);

  const AddCommentHandler = async () => {
    try {
      // commentsRouter.post("/:post_id", authentication, createComment);

      const comment = await axios.post(
        `http://localhost:5000/comments/${post.id}`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // console.log("comment.data.result", ...comment.data.result);
      // setPostComments((prev) => {
      //   console.log("[...prev, ...comment.data.result]", [
      //     ...prev,
      //     ...comment.data.result,
      //   ]);
      //   return [...prev, ...comment.data.result];
      // });
      setCommentsCount((prev) => prev + 1);
      handleCommentsModal();
      setCollapseComments(true);
    } catch (error) {
      console.log("AddCommentHandler", error);
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          item
          alignItems="center"
          // xs={4}
          xs="auto"
        >
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

        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          // xs={4}
          xs="auto"
          onClick={handleCommentsModal}
        >
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>

          <Link
            // onClick={commentsModal}
            component="button"
            underline="none"
            fontSize="sm"
            // fontSize={"0.7em"}
            fontWeight="lg"
            textColor="text.primary"
          >
            {commentsCount} comments
          </Link>
        </Grid>

        <Grid
          container
          item
          justifyContent="right"
          alignItems="center"
          // xs={4}
          xs="auto"
        >
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={handleOpenAddShare}
          >
            <SendOutlined />
          </IconButton>
          <Link
            component="button"
            underline="none"
            fontSize="sm"
            fontWeight="lg"
            textColor="text.primary"
            onClick={openSharesModal}
          >
            {post.shares} shares
          </Link>
        </Grid>
      </Grid>
      <CardContent orientation="horizontal" sx={{ gap: 1, mb: 2 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Avatar size="sm" src={userProfile.image} />
        </IconButton>
        <Input
          variant="plain"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <Link underline="none" role="button" onClick={AddCommentHandler}>
          Post
        </Link>
      </CardContent>
      <Collapse in={collapseComments}>
        {postComments.length ? (
          postComments.map((comment, i) => {
            // console.log(comment, i);
            return (
              <div key={i}>
                {i > 0 && (
                  <Divider variant="fullWidth" style={{ margin: "15px 0" }} />
                )}
                <Paper style={{ padding: "15px" }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar
                        alt={comment.first_name}
                        size="sm"
                        src={comment.commenter_image}
                      />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <Typography
                        component="h4"
                        variant="h4"
                        sx={{ color: "black" }}
                      >
                        {comment.first_name} {comment.last_name}
                      </Typography>
                      <Typography>{comment.comment}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Grid
                  container
                  wrap="nowrap"
                  columnSpacing={1}
                  ml={1}
                  sx={{ mt: "3px" }}
                >
                  <Grid item xs="auto">
                    <Typography>
                      {new Date(comment.created_at).toLocaleString()} -
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography>Like</Typography>
                  </Grid>
                  <Grid item ml="auto" xs="auto">
                    <Typography>Edit</Typography>
                  </Grid>
                  <Grid item mr={2} xs="auto">
                    <Typography>Delete</Typography>
                  </Grid>
                </Grid>
              </div>
            );
          })
        ) : (
          <Typography>There is no comments on this post yet.</Typography>
        )}
      </Collapse>

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
        <Box sx={modalStyle}>
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
                // href={`/page/${like.user_id}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  navigate(`/page/${like.user_id}`);
                }}
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

      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* Shares Modal */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={openShare}
        onClose={closeSharesModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Shares
            <hr />
          </Typography>
          {postShares.toReversed().map((share, i) => (
            <Typography key={i} id="keep-mounted-modal-description">
              <Link
                underline="hover"
                sx={{ color: "black", my: 0.5 }}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  navigate(`/page/${share.user_id}`);
                }}
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
                  <Avatar component="span" src={share.image} />
                </Box>

                {share.user_name}
              </Link>
            </Typography>
          ))}
        </Box>
      </Modal>

      {/*  share modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddShare}
        onClose={handleCloseAddShare}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddShare}>
          <Grid container sx={modalStyle} spacing={2} justifyContent="center">
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
                // setPostId(post.id);
              }}
            />

            <Button onClick={createNewShare} variant="outlined">
              Share
            </Button>
          </Grid>
        </Fade>
      </Modal>
    </>
  );
};

export default Comments;
