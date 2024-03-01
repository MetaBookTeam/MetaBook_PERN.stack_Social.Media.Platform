import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
  },

  reducers: {
    setFollow: (state , action) => {
      state.friends.push(action.payload);
    },
    setUnfollow: (state , action) => {
      state.friends !== action.payload;
    },
    getfriend: (state , action) => {
      state.friends == action.payload;
    },
  },
});

export const {setFollow,setUnfollow,getfriend} =
friendsSlice.actions;
export default friendsSlice.reducer;
