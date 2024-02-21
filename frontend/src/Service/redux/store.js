import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/Posts/postsSlice";
import authReducer from "./reducers/auth/authSlice";


export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
