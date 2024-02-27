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
  },
});

export const { setShares } = sharesSlice.actions;

export default sharesSlice.reducer;
