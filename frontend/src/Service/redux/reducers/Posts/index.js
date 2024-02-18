import { createSlice } from "@reduxjs/toolkit";

export const postsSlice=createSlice({

    name:"posts",
    initialState:{
        posts:[]
    },
    reducers:{
        setPosts:(state,action)=>{
            state.posts=action.payload
        },
        
        addPost:(state,action)=>{
            state.posts.push(action.payload)
        }
        
    },
    
})

export const {

setPosts,addPost

}=postsSlice.actions

export default postsSlice.reducer