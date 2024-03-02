import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

//* Redux
import { useDispatch, useSelector } from "react-redux";

const RightBar = () => {
  //* Redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // auth.isLoggedIn, auth.token, auth.userId;
  const posts = useSelector((state) => state.posts.posts);

  const users = useSelector((state) => state.users.users);
  // console.log("users", users);

  //===============================================================
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="stick" width={300}>
        <Typography variant="h6" fontWeight={100}>
          Online Friends
        </Typography>

        <AvatarGroup max={7}>
          {users.map((user) => {
            // console.log("user.image", user.image);
            return (
              <Avatar
                key={user.id}
                src={user.image}
                alt={`${user.first_name} ${user.last_name}`}
              />
            );
          })}
        </AvatarGroup>

        {/* <Avatar 
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
           <Avatar
            alt="Travis Howard"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/4.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/6.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/7.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/8.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/9.jpg"
          /> */}

        {/* //* Images Collage ///////////// */}

        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Latest Photos
        </Typography>
        <ImageList sx={{ width: 300, height: 300 }} cols={3} rowHeight={90}>
          {/* {posts.toReversed().map((post) => { */}
          {posts.map((post) => {
            if (post.photo_url) {
              return (
                <ImageListItem key={post.id}>
                  <img
                    srcSet={`${post.photo_url}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                    src={`${post.photo_url}?w=100&h=100&fit=crop&auto=format`}
                    alt={post.id}
                    loading="lazy"
                  />
                </ImageListItem>
              );
            }
          })}
        </ImageList>

        {/* //* ////////////////////////////////////////////////// */}

        <Typography variant="h6" fontWeight={100} mt={2}>
          Latest Conversations
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default RightBar;
