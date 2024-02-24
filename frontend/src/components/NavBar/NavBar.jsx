// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import Container from '@mui/material/Container'
// import { useState } from "react";
// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Logout'];
// const NavBar = () => {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);

//   };

//   const handleCloseUserMenu = () => {

//     setAnchorElUser(null);

//   };

//   return (
//        <AppBar position="static">
//         <Container>
//         <Toolbar disableGutters>

//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >

//               <NavLink className={"Home"} to="/">Home</NavLink>

//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >

//             <NavLink className={"Home"} to="/">Home</NavLink>
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (

//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>

//             ))}

//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >

//                 <MenuItem  onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">
//                   <NavLink to="/users/login">Logout</NavLink>
//                   </Typography>
//                 </MenuItem>
//                 <MenuItem  onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">
//                   <NavLink to="/users/login">Profile</NavLink>
//                   </Typography>
//                 </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//         </Container>
//     </AppBar>

//   );
// };

// export default NavBar;

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
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
import { useDispatch } from "react-redux";

import { setLogout } from "../../Service/redux/reducers/auth/authSlice";
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

const NavBar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          MetaBook
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">John</Typography>
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
          <NavLink to="/profile/2">Profile</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
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
