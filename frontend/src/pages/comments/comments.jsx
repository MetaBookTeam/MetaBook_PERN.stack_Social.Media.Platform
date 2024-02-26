 import React, { useState } from 'react';
 //import Paper from "@mui/material/Paper";


 import { useDispatch, useSelector } from "react-redux";
 import AspectRatio from "@mui/joy/AspectRatio";
 import Avatar from "@mui/joy/Avatar";
 import Box from "@mui/joy/Box";
 import Card from "@mui/joy/Card";
 import CardContent from "@mui/joy/CardContent";
 import CardOverflow from "@mui/joy/CardOverflow";
 import Link from "@mui/joy/Link";
 import IconButton from "@mui/joy/IconButton";
 import Input from "@mui/joy/Input";
 import Typography from "@mui/joy/Typography";
 import MoreHoriz from "@mui/icons-material/MoreHoriz";
 import Modal from "@mui/material/Modal";
 import Button from "@mui/material/Button";
 import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
 import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
 import SendOutlined from "@mui/icons-material/SendOutlined";
 import Face from "@mui/icons-material/Face";
 import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
 import Grid from "@mui/material/Grid";
 import Paper from "@mui/material/Paper";
 //import Comments from "../../pages/Comments/Comments";
 import { styled } from "@mui/material/styles";



const Comments = ({post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const {userProfile} = useSelector((state) => state.users);
  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleShare = () => {
    setShareCount(shareCount + 1);
  };
  //
  const [open, setOpen] = useState(false);
 
  const commentsModel = () => setOpen(true);
  const sharesModel = () => setOpen(true);
 

  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

 

  

  return (
    <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid container item alignItems="center" xs={4}>
            <IconButton variant="plain" color="neutral" size="sm" onClick={handleLike}>
              <FavoriteBorder />
            </IconButton>
            {/*  onClick={likeModel } */}
            <Link 
              component="button"
              underline="none"
              fontSize="sm"
              fontWeight="lg"
              textColor="text.primary"
            >
              {post.likes} Likes
            </Link>
          </Grid>

          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={4}
          >
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined />
            </IconButton>
            <Link
              onClick={commentsModel}
              component="button"
              underline="none"
              fontSize="sm"
              fontWeight="lg"
              textColor="text.primary"
            >
              {post.comments} comments
            </Link>
          </Grid>

          <Grid
            container
            item
            justifyContent="right"
            alignItems="center"
            xs={4}
          >
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined />
            </IconButton>
            <Link
              onClick={sharesModel}
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
        <Link
          // onClick={
          //   dispatch(updatePost(res.id))
          //   }
          underline="none"
          role="button"
          >
          Post
        </Link>
      </CardContent>
        </Grid>
  );
};

export default Comments; 


/* import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const CommentComponent = () => {
  const [commentText, setCommentText] = useState('');
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const handleLikeComment = (commentId) => {
    dispatch(likeComment(commentId));
  };

  const getAllComments = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get("http://localhost:5000/comments", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch({
          type: 'COMMENTS_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        console.error('Error fetching comments:', error);
        dispatch({
          type: 'FETCH_COMMENTS_FAILURE',
          payload: error.message,
        });
      }
    };
  };

  const handleAddComment = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post('http://localhost:5000/comments', { text: commentText }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: 'ADD_COMMENT_SUCCESS',
        payload: response.data,
      });
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      dispatch({
        type: 'ADD_COMMENT_FAILURE',
        payload: error.message,
      });
    }
  }
  

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            <button onClick={() => handleLikeComment(comment.id)}>Like</button>
          </li>
        ))}
      </ul>

      <div>
        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentComponent; */
/* const handleShareComment = (post_id) => {
    const response =  axios.post('http://localhost:5000/posts/shares/:post_id', { `${post_id}` }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    dispatch(handleShareComment(commentId));
  } */