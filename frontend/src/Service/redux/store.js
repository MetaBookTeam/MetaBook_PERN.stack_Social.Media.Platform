import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/Posts/postsSlice";
export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
