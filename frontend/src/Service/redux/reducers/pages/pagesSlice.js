import { createSlice } from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    pages: [],
  },
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    getPageByUser: (state, action) => {},
    updatePageById: (state, action) => {
      state.pages = state.pages.map((elem, i) => {
        if (elem.id == action.payload.id) {
          elem = action.payload;
        }
        return elem;
      });
    },
  },
});

export const { setPages, getPageByUser, updatePageById } = pagesSlice.actions;
export default pagesSlice.reducer;
