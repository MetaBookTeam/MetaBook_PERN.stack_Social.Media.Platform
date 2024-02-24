import { createSlice } from "@reduxjs/toolkit";

export const cloudinary = createSlice({
  name: "cloudinary",
  initialState: {
    image: "",
    url: "",
  },

  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
      // state.image = JSON.parse(action.payload);
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { setImage, setUrl } = cloudinary.actions;
export default cloudinary.reducer;
