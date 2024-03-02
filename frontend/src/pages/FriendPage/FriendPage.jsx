import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";

import Post from "../../components/Post/Post";

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

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userProfile, friendProfile } = useSelector((state) => state.users);
  const friends = useSelector((state) => state.friends.friends);
  const postsFr = useSelector((state) => state.posts.posts);

  const { friend_id } = useParams();

  const getUserById = async () => {
    try {
      const user = await axios.get(`http://localhost:5000/users/${friend_id}`, {
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
      const user = await axios.get(`http://localhost:5000/posts/${friend_id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      dispatch(setPosts(user.data.result));
    } catch (error) {
      console.log("setFriendProfile", error);
    }
  };

  const AddNewFriend = async () => {
    try {
      const user = await axios.post(
        `http://localhost:5000/users/friends/${friend_id}`,
        { user_id: auth.userId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(setFollow(...user.data.result));
    } catch (error) {
      console.log("setFollow", error);
    }
  };

  const [userFriends, setUserFriends] = useState([]);

  const getAllFriend = async () => {
    try {
      const user = await axios.get(
        `http://localhost:5000/users/friends/${friend_id}/${auth.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setUserFriends(user.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPost();
    getUserById();
    getAllFriend();
  }, []);

  const deleteFriend = async () => {
    try {
      const user = await axios.delete(
        `http://localhost:5000/users/friends/${friend_id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      dispatch(setUnfollow(user.data.result));
    } catch (error) {
      console.log(error);
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
                {userFriends.length ? (
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
                <Grid item xs={4}>
                  Followers
                  <h1>{userFriends.length}</h1>
                </Grid>
                <Grid item xs={4}>
                  Following
                  <h1>{userFriends.length}</h1>
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
                        userProfile.state &&
                        userProfile.country &&
                        `${userProfile.state} - ${userProfile.country}`
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
    </>
  );
};

export default FriendPage;
