
 import React, { useState } from 'react';




 import {  useSelector } from "react-redux";

 import Avatar from "@mui/joy/Avatar";
 
 import CardContent from "@mui/joy/CardContent";
 import Link from "@mui/joy/Link";
 import IconButton from "@mui/joy/IconButton";
 import Input from "@mui/joy/Input";
 
 import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
 import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
 import SendOutlined from "@mui/icons-material/SendOutlined";
 
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



