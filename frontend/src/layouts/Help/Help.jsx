import { NavLink, Outlet } from "react-router-dom";

export default function HelpLayout() {
  return (
    <div className="help-layout">
      <h2>Website help</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, assumenda
        id? Perspiciatis quas ut commodi, saepe fugiat voluptas molestiae
        excepturi ducimus illum, similique enim iure odit dolorem. Deserunt,
        saepe quisquam.
      </p>

      <nav>
        <NavLink to="faq">View the FAQ</NavLink>
        <NavLink to="contact">Contact us</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
