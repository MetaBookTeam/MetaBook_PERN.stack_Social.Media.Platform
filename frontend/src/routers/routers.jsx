import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Help from "../layouts/Help/Help";
import FAQ from "../pages/FAQ/FAQ";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Post from "../components/Post/Post";
import Posts from "../pages/Posts/Posts";

import WelcomePage from "../pages/WelcomePage/WelcomePage";
import Profile from "../pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "help",
        element: <Help />,
        children: [
          {
            path: "faq",
            element: <FAQ />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
        ],
      },
      {
        path: "posts",
        element: <Posts />,
        children: [
          {
            path: ":id",
            element: <Post />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
