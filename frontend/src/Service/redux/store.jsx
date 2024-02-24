import postsReducer from "./reducers/Posts/postsSlice";
import authReducer from "./reducers/auth/authSlice";
import pagesReducer from "./reducers/pages/pagesSlice";
import commentsReducer from "./reducers/comments/commentsSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    pages: pagesReducer,
    posts: postsReducer,
  },
});

export default store;
