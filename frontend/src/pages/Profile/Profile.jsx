import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setShares } from "../../Service/redux/reducers/shares/sharesSlice";
import { addPost } from "../../Service/redux/reducers/Posts/postsSlice";
import {
  setUsers,
  setUpdateUserInformation,
} from "../../Service/redux/reducers/users/usersSlice";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Add from "../../components/Add/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import Shares from "../../components/Shares/Shares";
import Post from "../../components/Post/Post";

// extra information
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

const Profile = () => {
  // Start extra information
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [secondary, setSecondary] = React.useState(false);

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // End extra information
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const shares = useSelector((state) => state.shares.shares);
  const { users, userProfile } = useSelector((state) => state.users);
  // console.log('userProfile.followers', userProfile.followers)
  // console.log("userProfile", userProfile);

  const [postProfile, setPostProfile] = useState([]);

  //* ////////////////////////////
  const getAllUsers = async () => {
    try {
      // console.log('auth.userId', auth.userId)
      const allUser = await axios.get(`https://meraki-academy-project-5.onrender.com/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      dispatch(setUsers(allUser.data.result));
      // console.log(...user.data.result);
      // console.log(user.data.result[0]);
    } catch (error) {
      console.log("getAllUsers", error);
    }
  };

  // for update user info
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [bio, setUpdatedBio] = useState("");
  const [name, setUpdatedName] = useState("");
  const [phone, setUpdatedPhone] = useState("");
  const [update, setUpdated] = useState({
    bio: "",
    name: "",
    phone: 0,
  });

  const updateUserInformation = async () => {
    try {
      const newInfo = await axios.put(
        `https://meraki-academy-project-5.onrender.com/users/${auth.userId}`,
        { update },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(setUpdateUserInformation(newInfo.data.result));
      // console.log("Done");
    } catch (error) {
      console.log(error.message);
    }
  };

  // get all profile shared posts ===================================
  const getAllShares = async () => {
    try {
      const result = await axios.get(
        `https://meraki-academy-project-5.onrender.com/posts/shares/${auth.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(setShares(result.data.result));
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // get all profile posts ===========================================
  const getPostProfile = async () => {
    try {
      const post = await axios.get(`https://meraki-academy-project-5.onrender.com/posts/profile`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPostProfile(post.data.result);
      // console.log(post.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShares();
    getPostProfile();
    getAllUsers();
  }, []);

  // ====================================================
  //* followers dropdown list
  // const [anchorFollowers, setAnchorFollowers] = React.useState(null);
  // const openFollowers = Boolean(anchorFollowers);
  // const handleClickFollowers = (event) => {
  //   setAnchorFollowers(event.currentTarget);
  // };
  // const handleCloseFollowers = () => {
  //   setAnchorFollowers(null);
  // };
  // =========================================
  // openFollowersModal
  const [userFollowers, setUserFollowers] = useState([]);

  // Followers Modal Toggle ======================
  const [openFollowers, setOpenFollowers] = useState(false);
  const closeFollowersModal = () => setOpenFollowers(false);

  const openFollowersModal = async () => {
    try {
      // usersRouter.get("/friends", authentication, getAllFriends);
      // const followers = await axios.get(`https://meraki-academy-project-5.onrender.com/users/friends`, {
      //   headers: {
      //     Authorization: `Bearer ${auth.token}`,
      //   },
      // });

      //! I will get all users then handle which one is a friend from the followers column in getAllUsers
      console.log("userProfile.followers", userProfile.followers);
      console.log("users", users);

      const followers = users.filter((user, i) => {
        if (userProfile.followers) {
          return userProfile.followers.includes(user.id);
        }
      });
      // console.log("followers", followers);

      setUserFollowers(followers);
    } catch (error) {
      console.log("openFollowersModal", error);
    }
  };
  // =========================================
  // openFollowingModal
  const [userFollowing, setUserFollowing] = useState([]);

  // Following Modal Toggle ======================
  const [openFollowing, setOpenFollowing] = useState(false);
  const closeFollowingModal = () => setOpenFollowing(false);

  const openFollowingModal = async () => {
    try {
      // usersRouter.get("/friends", authentication, getAllFriends);
      // const following = await axios.get(`https://meraki-academy-project-5.onrender.com/users/friends`, {
      //   headers: {
      //     Authorization: `Bearer ${auth.token}`,
      //   },
      // });

      //! I will get all users then handle which one is a friend from the following column in getAllUsers
      console.log("userProfile.following", userProfile.following);
      console.log("users", users);

      const following = users.filter((user, i) => {
        if (userProfile.following) {
          return userProfile.following.includes(user.id);
        }
      });
      // console.log("following", following);

      setUserFollowing(following);
    } catch (error) {
      console.log("openFollowingModal", error);
    }
  };
  console.log("userProfile", userProfile);
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Box
                sx={{
                  m: "10px",
                }}
              >
                <AspectRatio minHeight={120} maxHeight={350}>
                  <img
                    src={userProfile.cover_photo}
                    alt="A beautiful Cover photo."
                    style={{ borderRadius: "20px" }}
                  />
                </AspectRatio>
              </Box>
              <Button
                onClick={handleOpen}
                variant="outlined"
                sx={{
                  // position: "fixed",
                  zIndex: 10,
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                  m: "10px",
                }}
              >
                Edit Profile
              </Button>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  alt={userProfile.user_name}
                  src={userProfile.image}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "white solid 5px",
                    borderRadius: "50%",
                    margin: " -120px 0 0 0",
                    zIndex: 5,
                  }}
                />
              </Box>

              {/* <hr /> */}
              <Grid container sx={{ paddingTop: "10px" }}>
                <Grid
                  item
                  xs={4}
                  // onClick={handleClickFollowers}
                  onClick={() => {
                    setOpenFollowers(true);
                    openFollowersModal();
                  }}
                >
                  Followers
                  <h1>
                    {userProfile.followers ? userProfile.followers.length : 0}
                  </h1>
                </Grid>
                <Grid
                  item
                  xs={4}
                  onClick={() => {
                    setOpenFollowing(true);
                    openFollowingModal();
                  }}
                >
                  Following
                  <h1>
                    {userProfile.following ? userProfile.following.length : 0}
                  </h1>
                </Grid>
                <Grid item xs={4}>
                  Post
                  <h1>{postProfile.length}</h1>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {userProfile.user_name} info
              </Typography>
              <Divider />
              <Demo>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Bio"
                      secondary={secondary ? "Secondary text" : userProfile.bio}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={
                        secondary ? "Secondary text" : userProfile.email
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="User Name"
                      secondary={
                        secondary ? "Secondary text" : userProfile.user_name
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        secondary
                          ? "Secondary text"
                          : `0${userProfile.phone_number}`
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Address"
                      secondary={
                        secondary
                          ? "Secondary text"
                          : `${userProfile.state} - ${userProfile.country}`
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Gender"
                      secondary={
                        secondary ? "Secondary text" : userProfile.gender
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Account Created at"
                      secondary={new Date(
                        userProfile.created_at
                      ).toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Birthday"
                      secondary={new Date(userProfile.birthday).toDateString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="school"
                      secondary={userProfile.school}
                    />
                  </ListItem>
                </List>
              </Demo>
            </Item>
          </Grid>
          <Grid item xs={8}>
            {postProfile ? (
              postProfile.map((post, i) => {
                // console.log("postProfile.map post", post);
                // return <ProfilePost key={post.id} post={post} />;
                return <Post key={post.id} post={post} />;
              })
            ) : (
              <Item>You do not have any post </Item>
            )}
            {shares ? (
              shares.map((elem) => {
                return <Shares elem={elem} />;
              })
            ) : (
              <Item>You do not have any Shared post </Item>
            )}
          </Grid>
        </Grid>
        <Add />
        {/* Modal for update user information */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit your information
                <hr />
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: 700,
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <TextField
                  fullWidth
                  autoFocus
                  name="name"
                  onChange={(e) => {
                    setUpdatedName(e.target.value);
                  }}
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                />
                <TextField fullWidth label="Last Name" variant="standard" />
                <TextField
                  fullWidth
                  name="bio"
                  label="Bio"
                  variant="standard"
                />
                <TextField
                  fullWidth
                  name="phone"
                  onChange={(e) => {
                    setUpdatedPhone(e.target.value);
                  }}
                  id="standard-basic"
                  label="Phone Number"
                  variant="standard"
                />
                <TextField
                  fullWidth
                  name="bio"
                  onChange={(e) => {
                    setUpdatedBio(e.target.value);
                  }}
                  id="standard-basic"
                  label="Bio"
                  variant="standard"
                />
                <TextField fullWidth label="Birthday" variant="standard" />
                <TextField fullWidth label="Gender" variant="standard" />
                <TextField fullWidth label="School" variant="standard" />
                <TextField fullWidth label="City" variant="standard" />
                <TextField fullWidth label="State" variant="standard" />
                <TextField fullWidth label="Country" variant="standard" />
                <TextField fullWidth id="image" name="image" type="file" />
                <Button
                  variant="outlined"
                  sx={{ width: "70%", height: "4em", marginLeft: "3%" }}
                >
                  Update Image
                </Button>
                <TextField fullWidth id="image" name="image" type="file" />
                <Button
                  variant="outlined"
                  sx={{ width: "70%", height: "4em", marginLeft: "3%" }}
                >
                  Update Cover Photo
                </Button>
                <br />
                <Button
                  variant="contained"
                  onClick={() => {
                    setUpdated({
                      bio,
                      name,
                      phone,
                    });
                    updateUserInformation();
                  }}
                >
                  Update
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Container>

      {/* =================================================== */}
      {/* =================================================== */}
      {/*  followers dropdown list */}
      {/* =================================================== */}
      {/* =================================================== */}

      {/* <Menu
        anchorEl={anchorFollowers}
        id="account-menu"
        open={openFollowers}
        onClose={handleCloseFollowers}
        onClick={handleCloseFollowers}
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
        <MenuItem onClick={handleCloseFollowers}>
          <Avatar /> Profile
        </MenuItem>
         <Divider /> */}
      {/* <MenuItem
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
      </Menu>*/}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* Followers Modal */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={openFollowers}
        onClose={closeFollowersModal}
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
            Followers
            <hr />
          </Typography>
          {userFollowers.map((follower, i) => {
            // console.log("follower map", follower);
            return (
              <Typography key={i} id="keep-mounted-modal-description">
                <Link
                  underline="hover"
                  sx={{ color: "black", my: 0.5 }}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    navigate(`/page/${follower.id}`);
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
                    <Avatar component="span" src={follower.image} />
                  </Box>

                  {follower.user_name}
                </Link>
              </Typography>
            );
          })}
        </Box>
      </Modal>

      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* Following Modal */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={openFollowing}
        onClose={closeFollowingModal}
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
            Following
            <hr />
          </Typography>
          {userFollowing.map((following, i) => {
            return (
              <Typography key={i} id="keep-mounted-modal-description">
                <Link
                  underline="hover"
                  sx={{ color: "black", my: 0.5 }}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    navigate(`/page/${following.id}`);
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
                    <Avatar component="span" src={following.image} />
                  </Box>

                  {following.user_name}
                </Link>
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
