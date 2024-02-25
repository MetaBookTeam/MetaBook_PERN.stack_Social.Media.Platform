import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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

import { styled } from "@mui/material/styles";

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

const Post = ({ post }) => {
  const [open, setOpen] = useState(false);
  const likeModel = () => setOpen(true);
  const commentsModel = () => setOpen(true);
  const sharesModel = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postLike, setPostLike] = useState();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
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
  return (
    <Card
      variant="outlined"
      sx={{
        marginBlock: "10px",
        minWidth: 300,
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
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
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar
            size="sm"
            src={post.image}
            // sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          />
        </Box>
        <Typography fontWeight="lg">
          <NavLink to={`/page/${post.user_id}`}>{post.user_name}</NavLink>
        </Typography>
        <br />

        {/* <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        > */}
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5, ml: "auto" }}
        >
          {post.created_at}
        </Link>
        {/* </IconButton> */}
      </CardContent>

      {post.photo_url && (
        <CardOverflow>
          <AspectRatio>
            <img src={post.photo_url} alt="" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
      )}

      <CardContent>
        {/* <Paper sx={{ padding: "10px" }}> */}
        <Typography fontSize="sm" marginBottom={2}>
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          ></Link>{" "}
          {post.content}
        </Typography>
        {/* </Paper> */}
        <hr />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid container item alignItems="center" xs={4}>
            <IconButton variant="plain" color="neutral" size="sm">
              <FavoriteBorder />
            </IconButton>
            <Link
              onClick={likeModel}
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
        </Grid>
      </CardContent>

      {/* <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box
          sx={{ display: "flex", gap: 0.5, justifyContent: "space_between" }}
        >
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteBorder />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton>
        </Box>
      </CardContent> */}

      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
          {/* <Avatar
            size="sm"
            src={post.image}
            // sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          /> */}
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

      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* Modal /////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
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
          <Typography id="keep-mounted-modal-description" sx={{ mt: 6 }}>
            <Link
              component="span"
              underline="none"
              fontSize="16px"
              sx={{ color: "black", my: 0.5 }}
            >
              <Avatar
                component="span"
                sx={{ mr: 3 }}
                size="sm"
                src={post.image}
              />
              {post.user_name}
            </Link>
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
};

export default Post;
