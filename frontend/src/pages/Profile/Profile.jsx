import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import axios from "axios";
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
import { setShares } from "../../Service/redux/reducers/shares/sharesSlice";
import { addPost } from "../../Service/redux/reducers/Posts/postsSlice";
import Add from "../../components/Add/Add";
import { setUpdateUserInformation } from "../../Service/redux/reducers/users/usersSlice";
import Comments from "../Comments/Comments";
import ProfilePost from "../../components/ProfilePost/ProfilePost";
import Shares from'../../components/Shares/Shares'
// extra information

const Profile = () => {
  // Start extra information
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  const [secondary, setSecondary] = React.useState(false);
  // End extra information

  const auth = useSelector((state) => state.auth);
  const shares = useSelector((state) => state.shares.shares);

  const { userProfile } = useSelector((state) => state.users);
  // users.users , users.userProfile;

  // const [userProfile, setUserProfile] = useState([]);
  const [postProfile, setPostProfile] = useState([]);
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
  // for update user info
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [bio, setUpdatedBio] = useState("");
  const [name, setUpdatedName] = useState("");
  const [phone, setUpdatedPhone] = useState("");
  const [update, setUpdated] = useState({
    bio: "",
    name: "",
    phone: 0,
  });
  // shares

  const getAllshares = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/posts/shares/3`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      dispatch(setShares(result.data.result));
      // console.log(result);
    } catch (error) {
        console.log(error);

    }
  };
  const updateUserInformation = async () => {
    try {
      const newInfo = await axios.put(
        `http://localhost:5000/users/${auth.userId}`,
        { update },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(setUpdateUserInformation(newInfo.data.result));
      console.log("Done");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    updateUserInformation();
  }, [update]);

  const getPostProfile = async () => {
    try {
      const post = await axios.get(`http://localhost:5000/posts/profile`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPostProfile(post.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllshares();
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
                <Button onClick={handleOpen} variant="outlined">
                  Edit
                </Button>
              </Grid>
            </Item>
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
                console.log(elem);
                return <ProfilePost elem={elem} />;
              })
            ) : (
              <Item>You do not have any post </Item>
            )} 
            {shares ? (
              shares.map((elem) => {
            
                return <Shares elem={elem} />;
              })
            ) : (
              <Item>You do not have any Shares post </Item>
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
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <TextField
                  name="name"
                  onChange={(e) => {
                    setUpdatedName(e.target.value);
                  }}
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                />
                <TextField
                  name="phone"
                  onChange={(e) => {
                    setUpdatedPhone(e.target.value);
                  }}
                  id="standard-basic"
                  label="Phone"
                  variant="standard"
                />
                <TextField
                  name="bio"
                  onChange={(e) => {
                    setUpdatedBio(e.target.value);
                  }}
                  id="standard-basic"
                  label="Bio"
                  variant="standard"
                />
                <br />
                <Button
                  onClick={() => {
                    setUpdated({
                      bio,
                      name,
                      phone,
                    });
                  }}
                >
                  Update
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default Profile;
