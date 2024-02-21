import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    commentLike: [],
    shares: [],
    loading: false,
    error: null,
  },

  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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
      const { id, Comment } = action.payload;
      state.comments = state.comments.map((comment) =>
        comment.id === id ? { ...comment, ...Comment } : comment
      );
    },
    getCommentById: (state, action) => {
      state.comments = [action.payload];
    },
    createCommentLike: (state, action) => {
      const newCommentLike = {
  
        commentId: action.payload.commentId,
        userId: action.payload.userId,
        
      };
      
      state.commentLike.push(action.payload); 
      return newCommentLike

    },
    deleteCommentLikeById: (state, action) => {
      state.commentLike = state.commentLike.filter(
        (like) => like.id !== action.payload
      ); 
    },
    getLikesByCommentId: (state, action) => {
      
      state.commentLike = state.commentLike.filter(
        (like) => like.commentId === action.payload
      );
    },
    getShareByPostId: (state, action) => {
      state.shares = action.payload;
    },
    createShareByPostId: (state, action) => {
      state.shares.push(action.payload);
    },
    softDeleteShare: (state, action) => {
      state.shares = state.shares.filter(
        (share) => share.id !== action.payload
      );
    },
    
    
  },
});
export const {
  setLoading,
  setError,
  setcomments,
  getCommentsByPostId,
  deletecomments,
  updateComment,
  getCommentById,deleteCommentLikeByIdcreateCommentLike,getLikesByCommentId,getShareByPostId,
  createShareByPostId,
  softDeleteShare
} = commentsSlice.actions;

export default commentsSlice.reducer;
