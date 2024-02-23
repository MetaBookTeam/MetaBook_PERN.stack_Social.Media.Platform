import { createSlice } from "@reduxjs/toolkit";

export const cloudinary = createSlice({
  name: "cloudinary",
  initialState: {
    image: "",
    url: "",
  },

  reducers: {
    setImage: (state, action) => {
      state.token = action.payload;
    },
    setUrl: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setImage, setUrl } = cloudinary.actions;
export default cloudinary.reducer;
