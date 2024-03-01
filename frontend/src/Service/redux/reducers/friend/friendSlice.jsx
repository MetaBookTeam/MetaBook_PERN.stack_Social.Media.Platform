import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: "",
  },

  reducers: {
    setFollow: (state , action) => {
      state.friends == action.payload;
    },
    setUnfollow: (state , action) => {
      state.friends !== action.payload;
    },
    setfriend: (state , action) => {
      state.friends == action.payload;
    },
  },
});

export const {setFollow,setUnfollow,setfriend} =
friendsSlice.actions;
export default friendsSlice.reducer;
