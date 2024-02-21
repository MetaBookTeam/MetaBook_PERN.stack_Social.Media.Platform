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
      state.posts.push(action.payload);
    },

    updatePostById :(state,action)=>{
      state.posts=state.posts.map((elem,i)=>{
        if(elem.id==action.payload.id){
          elem=action.payload
        }
        return elem
      })
    }
  },
});

export const { setPosts, addPost } = postsSlice.actions;

export default postsSlice.reducer;
