import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import modalReducer from "../features/modal/modalSlice"
import profileReducer from "../features/profile/profileSlice"
import postsReducer from "../features/post/postSlice"
export const store = configureStore({
    reducer:{
        auth : authReducer,
        modal: modalReducer,
        profile: profileReducer,
        posts:postsReducer
    }
})