import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      action.payload = { ...action.payload, likes: 0, comments: 0, shares: 0 };
      state.posts.push(action.payload);
      // state.posts = [...state.posts, action.payload];
    },

    updatePostById: (state, action) => {
      state.posts = state.posts.map((elem, i) => {
        if (elem.id == action.payload.id) {
          elem = action.payload;
        }
        return elem;
      });
    },
    setPostsLikesById: (state, action) => {
      // console.log(state);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => {
        // the payload in this case is the id
        return post.id !== action.payload;
      });
    },
  },
});

export const {
  setPosts,
  addPost,
  setPostsLikesById,
  updatePostById,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;
