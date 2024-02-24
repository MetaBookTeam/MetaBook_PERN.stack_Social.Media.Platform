import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    commentLike: [],
    shares: [],
  },

  reducers: {
    setcomments: (state, action) => {
      state.comments = action.payload;
    },
    getCommentsByPostId: (state, action) => {
      state.comments = action.payload;
    },
    deletecomments: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    updateComment: (state, action) => {
      const { id, updatedComment } = action.payload;
      state.comments = state.comments.map((comment) =>
        comment.id === id ? { ...comment, ...updatedComment } : comment
      );
    },
    getCommentById: (state, action) => {
      state.comments = [action.payload];
    },
    setSingleComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});
export const {
  setcomments,
  getCommentsByPostId,
  deletecomments,
  updateComment,
  getCommentById,
  setSingleComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
