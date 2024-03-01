import * as React from "react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setUserProfile,
  setFriendProfile
} from "../../Service/redux/reducers/users/usersSlice";
import { useParams } from "react-router-dom";
 import {getfriend,setUnfollow,setFollow} from '../../Service/redux/reducers/friend/friendSlice'
import Stack from "@mui/material/Stack";
import axios from "axios";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AspectRatio from "@mui/joy/AspectRatio";
// import Box from '@mui/joy/Box';
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
import Tooltip from "@mui/material/Tooltip";
import { setPosts } from "../../Service/redux/reducers/Posts/postsSlice";
import Post from "../../components/Post/Post";
const FriendPage = () => {
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  const [secondary, setSecondary] = React.useState(false);
  useParams;
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
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
  useEffect(() => {
    getUserById();
  }, []);

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
  useEffect(() => {
    getUserPost();
  }, []);
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
      console.log(user.data.result);
      console.log("jj",friends);
    } catch (error) {
      console.log("mm", error);
    }
  };
  const [userFriends, setUserFriends] = useState([])
  const getAllFriend = async () => {
    console.log(friend_id);
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
    getAllFriend();
  }, []);
  // const deleteFriend
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Box sx={{ borderRadius: "sm", p: 1 }}>
                <AspectRatio minHeight={120} maxHeight={350}>
                  <img
                    src={friendProfile.cover_photo}
                    alt="A beautiful Cover photo."
                  />
                </AspectRatio>
                <Grid container sx={{ paddingTop: "10px" }}>
                  <Grid item sx={3}>
                    <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
                      
                       {userFriends.length ? <Button onClick={deleteFriend}>UnFollow </Button>:<Button onClick={AddNewFriend}>Follow </Button>}
                     
                    </Tooltip>
                  </Grid>
                  <Grid item sx={3}></Grid>
                </Grid>
              </Box>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Avatar
                  alt={friendProfile.first_name}
                  src={friendProfile.image}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
              {friendProfile.bio}
              <hr />
              <Grid container sx={{ paddingTop: "10px" }}>
                <Grid item xs={4}>
                  Followers
                  <h1>4</h1>
                </Grid>
                <Grid item xs={4}>
                  Following
                  <h1>0</h1>
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
                {friendProfile.first_name}'s info
              </Typography>

              <Demo>
                <List>
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
                      primary="Name"
                      secondary={
                        secondary ? "Secondary text" : friendProfile.user_name
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        secondary
                          ? "Secondary text"
                          : friendProfile.phone_number
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Address"
                      secondary={
                        secondary ? "Secondary text" : friendProfile.address
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
