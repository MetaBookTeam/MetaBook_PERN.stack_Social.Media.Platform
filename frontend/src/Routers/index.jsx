import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import About from "../pages/About";
import Help from "../layouts/Help";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Posts , { postsLoader } from "../pages/Posts";
//! postsLoader from pages not Service
// import { postsLoader } from "../Service/api/posts";

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
    ],
  },
  {
    path: "/posts",
    element: <Posts />,
    // loader is a function to retrieve a data
    loader: postsLoader,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
