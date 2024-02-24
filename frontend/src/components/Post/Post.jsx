import { useState } from "react";
import * as React from "react";
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
//
//import CommentComponent from '../../pages/comments/Comment';
import Comment from '../../pages/comments/comments';

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

const Post = ({ post,addComment,likeComment,dislikeComment,shareComment }) => {
  
  const [open, setOpen] = useState(false);
  const likeModel = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postLike, setPostLike] = useState();

  return (
    <Card
      variant="outlined"
      sx={{
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
        <Typography fontWeight="lg">{post.user_name}</Typography>

        {/* <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
              <MoreHoriz />
            </IconButton> */}
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src={post.photo_url} alt="" loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            {/* <Button></Button> */}
            <FavoriteBorder />
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
                {/* {posts.map((elem,ind)=> {
                      
                })} */}
               
                <Typography id="keep-mounted-modal-description" sx={{ mt: 6 }}>
                <Link
                  component="h1"
                  underline="none"
                  fontSize="16px"
                  sx={{ color: "black", my: 0.5 }}
                >
                  <Avatar sx={{ mr: 3 }} size="sm" src={post.image} />
                  {post.user_name}
               
                </Link>
                </Typography>
              </Box>
            </Modal>
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton>
        </Box>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: '50%',
                    width: `max(${6 - index}px, 3px)`,
                    height: `max(${6 - index}px, 3px)`,
                    bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
                  }}
                />
              ))}
            </Box>
            <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </Box> */}
      </CardContent>
      <CardContent>
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
        <Typography fontSize="sm">
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          ></Link>{" "}
          {post.content}
        </Typography>

        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
        >
          {/* {post.created_at} */}
          DAYS AGO
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
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
        ><>
          <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => sharePost(post.id)}>Share</button>
      <CommentComponent postId={post.id} addComment={addComment} />
      {post.comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            likeComment={likeComment}
            dislikeComment={dislikeComment}
          />
        ))}
      </>
          Post
        </Link>
      </CardContent>
    </Card>
  );
};

export default Post;

/* eslint-disable jsx-a11y/anchor-is-valid */
