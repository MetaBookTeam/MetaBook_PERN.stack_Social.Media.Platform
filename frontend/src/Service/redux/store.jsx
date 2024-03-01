import postsReducer from "./reducers/Posts/postsSlice";
import authReducer from "./reducers/auth/authSlice";
import pagesReducer from "./reducers/pages/pagesSlice";
import commentsReducer from "./reducers/comments/commentsSlice";
import usersReducer from "./reducers/users/usersSlice";
import sharesReducer from "./reducers/shares/sharesSlice";

import friendsReducer from "./reducers/friend/friendSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    pages: pagesReducer,
    posts: postsReducer,
    users: usersReducer,
    shares:sharesReducer,
    friends:friendsReducer,
  },
});

export default store;
