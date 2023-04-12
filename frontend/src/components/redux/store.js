import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import postsReducers from "./reducers/posts";
import profileReducers from "./reducers/profile";


export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducers,
    profile: profileReducers
  },
});
