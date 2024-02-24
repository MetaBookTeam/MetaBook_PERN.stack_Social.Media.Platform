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

import Page from "../pages/Page/Page";

import Profile from "../pages/Profile/Profile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/home",
        element: <Posts />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile/:user_id",
        element: <Profile />,
      },
      {
        path:"/pages",
        element:<Page/>
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
    ],
  },
 
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
