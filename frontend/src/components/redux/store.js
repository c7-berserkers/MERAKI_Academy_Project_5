import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import postsReducers from "./reducers/posts";

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducers,
  },
});
