import React, { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/system/Box";

import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";

import { addPost } from "../../Service/redux/reducers/Posts/postsSlice";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

//===============================================================

const Add = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.users);

  //===============================================================
  //* Cloudinary

  const [collapseImage, setCollapseImage] = useState(true);

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
        // setUrl(data.data.secure_url);
        console.log(data.data.url);
        setImageUrl(data.data.url);

        setUploadMessage("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
        setUploadMessage("Image Upload Error");
      });
  };

  //===============================================================

  const [content, setContent] = useState();

  const newPost = async () => {
    try {
      const newPost = await axios.post(
        `http://localhost:5000/posts`,
        {
          content,
          photo_url: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      dispatch(addPost(newPost.data.result));
      setOpen(false);
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          // left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          // maxWidth= "clamp(100px, calc(30% / 2rem + 10px), 900px)"
          // height={400}
          bgcolor={"white"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar src={userProfile.image} sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              {userProfile.user_name}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <Stack direction="row" gap={1} mt={2} mb={2}>
            <EmojiEmotions color="primary" />
            <Image
              color="secondary"
              onClick={() => setCollapseImage((prev) => !prev)}
            />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>

          {/* //* Cloudinary /////////////////////*/}
          <Collapse in={collapseImage}>
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
          </Collapse>

          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={newPost}>Post</Button>
            {/* <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button> */}
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default Add;
