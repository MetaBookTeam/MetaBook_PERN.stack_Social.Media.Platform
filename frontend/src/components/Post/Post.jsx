import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  updatePostById,
} from "../../Service/redux/reducers/Posts/postsSlice";

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
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/joy/IconButton";
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { styled } from "@mui/material/styles";

// import Message from "../Socket";

import Comments from "../../pages/Comments/Comments";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.users);
  // users.users , users.userProfile;
  // console.log(auth.userId == post.user_id);
  // console.log(auth.userId*1 === post.user_id);
  // ====================================================
  //* Edit post dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // =========================================
  //* delete Post

  const deletePostHandler = async (e) => {
    try {
      // postsRouter.delete("/:post_id", authentication, deletePostById); //done

      const deletedPost = await axios.delete(
        `http://localhost:5000/posts/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // console.log("deletedPost.data.result", deletedPost.data.result.rows[0].id);
      dispatch(deletePost(deletedPost.data.result.rows[0].id));
    } catch (error) {
      console.log("deletePostHandler", error);
    }
  };

  //===============================================================
  //* Cloudinary

  const [image, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  //* Upload Images to Cloudinary //////////////////////////
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cloudUploadP5");
    data.append("cloud_name", "dpbh42kjy");
    axios
      .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
      .then((data) => {
        console.log(data.data.url);
        setImageUrl(data.data.url);
        setUploadMessage("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
        setUploadMessage("Image Upload Error");
      });
  };

  // =========================================

  //* Edit Post Modal
  // post Modal Toggle ======================
  const [openEditPost, setOpenEditPost] = useState(false);
  const closeEditPostModal = () => setOpenEditPost(false);
  const [editPostContent, setEditPostContent] = useState("");

  const openEditPostModal = async (e) => {
    setEditPostContent(post.content);
    setOpenEditPost(true);
  };

  //* Edit Post

  const editPostHandler = async (e) => {
    try {
      // postsRouter.put("/:post_id", authentication, updatePostById);

      const updatePost = await axios.put(
        `http://localhost:5000/posts/${post.id}`,
        {
          // content: editPostContent ? editPostContent : post.content,
          // photo_url: editPostPhoto ? editPostPhoto : post.photo_url,
          content: editPostContent,
          photo_url: imageUrl ? imageUrl : null,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const newContent = updatePost.data.result[0].content;
      const newPhoto = updatePost.data.result[0].photo_url;
      console.log("first", { newContent, newPhoto });
      dispatch(
        updatePostById({
          ...post,
          content: newContent ? newContent : post.content,
          photo_url: newPhoto ? newPhoto : post.photo_url,
        })
      );
      closeEditPostModal();
    } catch (error) {
      console.log("editPostHandler", error);
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          margin: "20px",
          minWidth: 300,
          "--Card-radius": (theme) => theme.vars.radius.xl,
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
              {post.first_name} {post.last_name}
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

          {auth.userId == post.user_id && (
            <IconButton
              // variant="plain"
              // color="neutral"
              size="sm"
              // sx={{ ml: "auto" }}
              onClick={handleClick}
            >
              <MoreHoriz />
            </IconButton>
          )}
        </CardContent>

        {post.photo_url && (
          <CardOverflow>
            <AspectRatio>
              <img
                src={post.photo_url}
                alt=""
                loading="lazy"
                // onClick={() => openPostModal}
              />
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
      </Card>

      {/* =================================================== */}
      {/*  Edit post dropdown menu */}
      {/* =================================================== */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem> */}
        {/* <Divider /> */}
        <MenuItem
          onClick={(e) => {
            openEditPostModal(e);
            handleClose(e);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            deletePostHandler(e);
            handleClose(e);
          }}
        >
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* Edit Post Modal */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={openEditPost}
        onClose={closeEditPostModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Edit Post No.{post.id}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Edit this comment…"
            sx={{
              margin: "10px 0",
            }}
            onChange={(e) => {
              setEditPostContent(e.target.value);
            }}
            value={editPostContent}
          />
          
          {/* //* Cloudinary /////////////////////*/}

          <TextField
            sx={{ width: "75%" }}
            id="image"
            name="image"
            type="file"
            // marginBottom={3}
            helperText={uploadMessage && uploadMessage}
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
          <Button
            variant="outlined"
            sx={{
              width: "22%",
              height: "4em",
              marginLeft: "3%",
              marginBlockEnd: "16px",
            }}
            onClick={uploadImage}
          >
            upload
          </Button>

          <Button variant="contained" onClick={editPostHandler}>
            Apply Edits
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Post;
