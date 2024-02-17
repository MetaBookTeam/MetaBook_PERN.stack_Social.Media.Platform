import { NavLink } from "react-router-dom";
import Paper from '@mui/material/Paper';
const NavBar = () => {
  return (
    <nav>
      <Paper elevation={3} > Advance Router </Paper>
      
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/help">Help</NavLink>
      <NavLink to="/posts">Posts</NavLink>
     
    </nav>
  );
};

export default NavBar;
