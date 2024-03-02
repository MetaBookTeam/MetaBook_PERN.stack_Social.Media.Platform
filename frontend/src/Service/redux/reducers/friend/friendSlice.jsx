import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
  },

  reducers: {
    getAllFriends: (state, action) => {
      state.friends == action.payload;
    },
    setFollow: (state, action) => {
      state.friends.push(action.payload);
    },
    setUnfollow: (state, action) => {
      // action.payload = friend_id
      state.friends.filter((friend) => {
        return friend.id !== action.payload;
      });
    },
    getfriend: (state, action) => {
      state.friends == action.payload;
    },
  },
});

export const { getAllFriends, setFollow, setUnfollow, getfriend } =
  friendsSlice.actions;
export default friendsSlice.reducer;
