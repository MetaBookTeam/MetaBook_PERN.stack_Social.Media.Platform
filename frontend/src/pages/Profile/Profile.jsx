import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { useEffect, useState } from "react";
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
import { addPost } from "../../Service/redux/reducers/Posts/postsSlice";
import Add from "../../components/Add/Add";
// extra information

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Profile = () => {
  // Start extra information
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  const [content, setContent] = useState();

  const [secondary, setSecondary] = React.useState(false);
  // End extra information

  const auth = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.users);
  // users.users , users.userProfile;
  
  // const [userProfile, setUserProfile] = useState([]);
  const [postProfile, setPostProfile] = useState([]);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  //     console.log(user.data.result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUserById();
  // }, []);

  const getPostProfile = async () => {
    try {
      const post = await axios.get(`http://localhost:5000/posts/profile`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPostProfile(post.data.result);
      console.log(post.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostProfile();
  }, []);
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Box sx={{ borderRadius: "sm", p: 1 }}>
                <AspectRatio minHeight={120} maxHeight={350}>
                  <img
                    src={userProfile.cover_photo}
                    alt="A beautiful Cover photo."
                  />
                </AspectRatio>
              </Box>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userProfile.image}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
              {userProfile.bio}
            </Item>
            <Grid container>
              <Grid item xs={4}>
                <Item>
                  Followers
                  <h1>4</h1>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Following</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>Edit profile</Item>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {userProfile.user_name} info
              </Typography>

              <Demo>
                <List>
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
                      primary="Name"
                      secondary={
                        secondary ? "Secondary text" : userProfile.user_name
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        secondary ? "Secondary text" : userProfile.phone_number
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Address"
                      secondary={
                        secondary ? "Secondary text" : userProfile.address
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
                </List>
              </Demo>
            </Item>
          </Grid>
          <Grid item xs={8}>
            {postProfile ? (
              postProfile.map((elem) => {
                return <Item>{elem.content} </Item>;
              })
            ) : (
              <Item>You do not have any post </Item>
            )}
          </Grid>
        </Grid>
        <Add />
      </Container>
    </>
  );
};

export default Profile;
