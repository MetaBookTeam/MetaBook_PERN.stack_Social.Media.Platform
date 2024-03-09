import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>NotFound 404</h2>

      <p>
        Go to the <NavLink to="/">Homepage</NavLink>
      </p>
    </div>
  );
};

export default NotFound;
