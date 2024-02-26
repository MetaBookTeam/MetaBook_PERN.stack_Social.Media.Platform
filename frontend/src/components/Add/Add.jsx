import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import Box from "@mui/system/Box";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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

const Add = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {userProfile} = useSelector((state) => state.users);
  // users.users , users.userProfile;

  // const [userProfile, setUserProfile] = useState([]);
  const [content, setContent] = useState();

  // const getUserById = async () => {
  //   try {
  //     const user = await axios.get(
  //       `http://localhost:5000/users/${auth.userId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth.token}`,
  //         },
  //       }
  //     );
  //     setUserProfile(...user.data.result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUserById();
  // }, []);

  const newPost = async () => {
    try {
      const NewPost = await axios.post(
        `http://localhost:5000/posts`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      dispatch(addPost(NewPost.data.result));
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
          width={400}
          height={310}
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
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <EmojiEmotions color="primary" />
            <Image color="secondary" />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={newPost}>Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default Add;
