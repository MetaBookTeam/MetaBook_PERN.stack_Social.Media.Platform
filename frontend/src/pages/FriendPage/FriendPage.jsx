import * as React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../Service/redux/reducers/Posts/postsSlice";
import {
  setUserProfile,
  setFriendProfile,
} from "../../Service/redux/reducers/users/usersSlice";
import {
  getAllFriends,
  getfriend,
  setUnfollow,
  setFollow,
} from "../../Service/redux/reducers/friend/friendSlice";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AspectRatio from "@mui/joy/AspectRatio";
// import Box from '@mui/joy/Box';
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/joy/Link";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";

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

const FriendPage = () => {
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [secondary, setSecondary] = React.useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { users, friendProfile } = useSelector((state) => state.users);
  const { friends } = useSelector((state) => state.friends);
  const postsFr = useSelector((state) => state.posts.posts);

  // console.log("friends", friends);
  // console.log("friendProfile", friendProfile);

  const { friend_id } = useParams();

  const getUserById = async () => {
    try {
      const user = await axios.get(`https://meraki-academy-project-5.onrender.com/users/${friend_id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      dispatch(setFriendProfile(...user.data.result));
    } catch (error) {
      console.log("setFriendProfile", error);
    }
  };

  const getUserPost = async () => {
    try {
      const user = await axios.get(`https://meraki-academy-project-5.onrender.com/posts/${friend_id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      dispatch(setPosts(user.data.result));
    } catch (error) {
      console.log("setFriendPosts", error);
    }
  };

  const AddNewFriend = async () => {
    try {
      //usersRouter.post("/friends/:friend_id", authentication, addFriend);
      const user = await axios.post(
        `https://meraki-academy-project-5.onrender.com/users/friends/${friend_id}`,
        // { user_id: auth.userId },
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log("...user.data.result", ...user.data.result);
      dispatch(setFollow(...user.data.result));
      setUserFollowersCounter((prev) => prev + 1);
      setIsMyFriend(true);
    } catch (error) {
      console.log("setFollow", error);
    }
  };

  // const [isMyFriend, setIsMyFriend] = useState([]);
  const [isMyFriend, setIsMyFriend] = useState(false);

  console.log("isMyFriend", isMyFriend);

  const isMyFriendHandler = async () => {
    try {
      const user = await axios.get(
        `https://meraki-academy-project-5.onrender.com/users/friends/${friend_id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log("isMyFriendHandler", user.data.result);
      // setIsMyFriend(user.data.result);
      setIsMyFriend(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPost();
    getUserById();
    isMyFriendHandler();
  }, []);

  const deleteFriend = async () => {
    try {
      const user = await axios.delete(
        `https://meraki-academy-project-5.onrender.com/users/friends/${friend_id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // console.log("user.data.result", user.data.result);
      /* 
      [
    {
        "id": 36,
        "user_id": 9,
        "friend_id": 6,
        "created_at": "2024-03-01T23:03:35.177Z",
        "is_deleted": 0
    }
]
      */
      dispatch(setUnfollow(friend_id));
      setUserFollowersCounter((prev) => prev - 1);
      setIsMyFriend(false);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // openFollowersModal
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowersCounter, setUserFollowersCounter] = useState(
    friendProfile.followers?.length
  );

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
      console.log("userProfile.followers", friendProfile.followers);
      console.log("users", users);

      const followers = users.filter((user, i) => {
        if (friendProfile.followers) {
          return friendProfile.followers.includes(user.id);
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
  // const [userFollowingCounter, setUserFollowingCounter] = useState(
  //   friendProfile.following?.length
  // );
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
      console.log("userProfile.following", friendProfile.following);
      console.log("users", users);

      const following = users.filter((user, i) => {
        if (friendProfile.following) {
          return friendProfile.following.includes(user.id);
        }
      });
      // console.log("following", following);

      setUserFollowing(following);
    } catch (error) {
      console.log("openFollowingModal", error);
    }
  };

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
                    src={friendProfile.cover_photo}
                    alt="A beautiful Cover photo."
                    style={{ borderRadius: "20px" }}
                  />
                </AspectRatio>
                {/* <Grid container sx={{ paddingTop: "10px" }}>
                  <Grid item xs={3}>
                    <Tooltip title="Add" enterDelay={500} leaveDelay={200}> */}
                {isMyFriend ? (
                  <Button
                    onClick={deleteFriend}
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
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    onClick={AddNewFriend}
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
                    Follow
                  </Button>
                )}
                {/* </Tooltip>
                  </Grid> */}
                {/* <Grid item xs={3}></Grid> */}
                {/* </Grid> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // gap: 2,
                  justifyContent: "center",
                }}
              >
                <Avatar
                  alt={friendProfile.first_name}
                  src={friendProfile.image}
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
                  onClick={() => {
                    setOpenFollowers(true);
                    openFollowersModal();
                  }}
                >
                  Followers
                  {/* <h1>{userFollowersCounter ? userFollowersCounter : 0}</h1> */}
                  <h1>
                    {friendProfile.followers
                      ? friendProfile.followers.length
                      : 0}
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
                    {friendProfile.following && friendProfile.following.length}
                  </h1>
                </Grid>
                <Grid item xs={4}>
                  Post
                  <h1>10</h1>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {friendProfile.user_name}'s info
              </Typography>
              <Divider />
              <Demo>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Bio"
                      secondary={
                        secondary ? "Secondary text" : friendProfile.bio
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={
                        secondary ? "Secondary text" : friendProfile.email
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="User Name"
                      secondary={
                        secondary ? "Secondary text" : friendProfile.user_name
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        friendProfile.phone_number &&
                        `0${friendProfile.phone_number}`
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Address"
                      secondary={
                        friendProfile.state &&
                        friendProfile.country &&
                        `${friendProfile.state} - ${friendProfile.country}`
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Gender"
                      secondary={
                        secondary ? "Secondary text" : friendProfile.gender
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Account Created at"
                      secondary={new Date(
                        friendProfile.created_at
                      ).toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Birthday"
                      secondary={new Date(
                        friendProfile.birthday
                      ).toDateString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="school"
                      secondary={friendProfile.school}
                    />
                  </ListItem>
                </List>
              </Demo>
            </Item>
          </Grid>
          <Grid item xs={8}>
            {postsFr ? (
              postsFr.map((elem, i) => {
                return <Post key={i} post={elem} />;
              })
            ) : (
              <Item>{friendProfile.first_name} do not have any post </Item>
            )}
          </Grid>
        </Grid>
      </Container>
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

                  {follower.first_name && follower.last_name
                    ? `${follower.first_name} ${follower.last_name}`
                    : follower.user_name}
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
            console.log("following map", following);
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

                  {following.first_name && following.last_name
                    ? `${following.first_name} ${following.last_name}`
                    : following.user_name}
                </Link>
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </>
  );
};

export default FriendPage;
