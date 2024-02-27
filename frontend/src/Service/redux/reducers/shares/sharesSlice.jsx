import { createSlice } from "@reduxjs/toolkit";

export const sharesSlice = createSlice({
  name: "shares",
  initialState: {
    shares: [],
  },
  reducers: {
    setShares: (state, action) => {
      state.shares = action.payload;
    },
    addShare: (state, action) => {
      state.shares.push(action.payload);
    },
  },
});

export const { setShares,addShare } = sharesSlice.actions;

export default sharesSlice.reducer;
