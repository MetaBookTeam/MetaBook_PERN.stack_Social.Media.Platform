import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <h1>Advance Router</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/help">Help</NavLink>
      <NavLink to="/posts">Posts</NavLink>
    </nav>
  );
};

export default NavBar;
