// import { configureStore } from "@reduxjs/toolkit";
// import postsReducer from "./reducers/Posts/postsSlice";
// import authReducer from "./reducers/auth/authSlice";
// import cloudinaryReducer from "./reducers/cloudinary/cloudinarySlice";

// // ==============================================
// // import rootReducer from "./reducer";
// // ==============================================
// export default configureStore({
//   reducer: {
//     // rootReducer,
// auth: authReducer,
// posts: postsReducer,
// cloudinary: cloudinaryReducer,
//   },
//   // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types
//         ignoredActions: ["your/action/type"],
//         // Ignore these field paths in all actions
//         ignoredActionPaths: ["meta.arg", "payload.timestamp"],
//         // Ignore these paths in the state
//         ignoredPaths: ["items.dates"],
//       },
//     }),
// });

// ===================================================================================================================================================================================

import postsReducer from "./reducers/Posts/postsSlice";
import authReducer from "./reducers/auth/authSlice";
// import cloudinaryReducer from "./reducers/cloudinary/cloudinarySlice";

import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import rootReducer from "./reducers";
// const rootReducer = combineReducers({
//   auth: authReducer,
//   posts: postsReducer,
//   cloudinary: cloudinaryReducer,
// });

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    // cloudinary: cloudinaryReducer,
  },
  // reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, (state) => {
  //     customEntityAdapter.removeAll(state);
  //   });
  // },
});

export default store;
