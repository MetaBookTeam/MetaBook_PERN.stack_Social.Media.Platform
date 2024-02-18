import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/Posts/index"
export default configureStore ({

    reducer:{
        posts:postsReducer
    },

});