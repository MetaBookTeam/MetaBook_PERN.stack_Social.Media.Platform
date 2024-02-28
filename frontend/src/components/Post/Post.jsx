import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
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
import Comments from "../../pages/Comments/Comments";
import { styled } from "@mui/material/styles";

const modalStyle = {
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
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const { userProfile } = useSelector((state) => state.users);
  // users.users , users.userProfile;

  // Post Modal Toggle ======================
  const [openPost, setOpenPost] = useState(false);

  const openPostModal = () => setOpenPost(true);
  const closePostModal = () => setOpenPost(false);

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
          <Avatar size="sm" src={post.image} />
        </Box>
        <Typography fontWeight="lg">
          <NavLink className={"user_name"} to={`/page/${post.user_id}`}>
            {post.user_name}
          </NavLink>
        </Typography>
        <br />

        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5, ml: "auto" }}
        >
          {new Date(post.created_at).toLocaleString()}
        </Link>
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
        <Comments values={{ post, modalStyle }} />
      </CardContent>

      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* post Modal */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={openPost}
        onClose={closePostModal}
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
            Post details
            <hr />
          </Typography>
          {/* {postLikes.toReversed().map((like, i) => (
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
          ))} */}
        </Box>
      </Modal>
    </Card>
  );
};

export default Post;
