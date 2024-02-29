import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Button,
  Fade,
  Modal,
  Backdrop,
  Paper,
} from "@mui/material";

import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import axios from "axios";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Service/redux/reducers/auth/authSlice";
import socketInit from "../socket.server";
import ChildModal from "../ChildModal/ChildModal";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
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
const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // auth.isLoggedIn, auth.token, auth.userId;

  const { userProfile } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);

  // chatModal
  const [socket, setSocket] = useState(null);
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  const [openChat, setOpenChate] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleOpenChat = () => {
    setOpenChate(true);
    setSocket(
      socketInit({
        user_id: auth.userId,
        token: auth.token,
      })
    );
  };
  useEffect(() => {
    // mount
    // in update body start second
    socket?.on("connect", () => {
      setIsConnected(true);
      console.log(socket);
    });
    socket?.on("connect_error", (error) => {
      console.log(error.message);
      setIsConnected(false);
    });

    // will start in unmount remove from DOM
    // in update return start first
    return () => {
      socket?.close();
      socket?.removeAllListeners();
    };
  }, [socket]);

  const handleCloseChat = () => setOpenChate(false);

  // Search Box
  const [allUsers, setAllUsers] = useState([]);
  const getAllUser = async () => {
    try {
      const user = await axios.get(`http://localhost:5000/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setAllUsers(user.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const [filter, setFilter] = useState(allUsers);
  const handleFilter = (event) => {
    const value = event.target.value;
    const filtered = allUsers.filter((allUsers) =>
      allUsers.user_name.includes(value)
    );
    setFilter(filtered);
  };

  // console.log(filter);

  return (
    <AppBar position="sticky">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openChat}
        onClose={handleCloseChat}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openChat}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Start Chatting
              <hr />
            </Typography>

            {allUsers.map((users, i) => {
              return (
                <div key={i}>
                  <Paper elevation={0}>
                    {users.first_name} {users.last_name}
                  </Paper>
                  <ChildModal socket={socket} userId={users.id} />
                </div>
              );
            })}
          </Box>
        </Fade>
      </Modal>
      <StyledToolbar>
        <Typography variant="h6">
          {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}> */}
          <NavLink className={"Home"} to={"/home"}>
            MetaBook
          </NavLink>
        </Typography>
        <NavLink className={"Home"} to={"/contact"}>
          Contact Us
        </NavLink>
        <NavLink className={"Home"} to={"/about"}>
          About Us
        </NavLink>
        {/* <Pets sx={{ display: { xs: "block", sm: "none" } }} /> */}
        <Stack spacing={2} sx={{ width: 300, bgcolor: "white" }}>
          <Autocomplete
            disableClearable
            options={allUsers.map((option) => option.first_name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Stack>
        {/* <Search>
          <InputBase onChange={handleFilter} placeholder="search..." />
        </Search> */}

        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail onClick={handleOpenChat} />
          </Badge>
          <Badge color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={userProfile.image}
            onClick={(e) => setOpen(true)}
          />
          <Typography variant="span" onClick={(e) => setOpen(true)}>
            {userProfile.first_name} {userProfile.last_name}
          </Typography>
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} src={userProfile.image} />
          <Typography variant="span">{userProfile.first_name}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <NavLink className={"userInfo"} to={`/profile`}>
            Profile
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            className={"userInfo"}
            onClick={() => {
              dispatch(setLogout());
            }}
            to="/login"
          >
            Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
