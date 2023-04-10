import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPosts: (state, { payload }) => {
      state.posts.push(payload);
    },
    updatePosts: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        return post.id === payload.id ? payload : post;
      });
    },
    deletePosts: (state, { payload }) => {
      state.posts = state.posts.filter((post) => {
        return post.id !== payload;
      });
    },
    setComments: (state, { payload }) => {
      state.posts = state.posts.map((article) => {
        if (article.id === payload.article_id) {
          article.comments = payload.comments;
        }
        return post;
      });
    },
    addComment: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload.article_id) {
          if (post.comments) {
            post.comments.push(payload.comment);
          } else {
            post.comments = [payload.comment];
          }
        }
        return post;
      });
    },
  },
});

export const {
  setPosts,
  addPosts,
  updatePosts,
  deletePosts,
  setComments,
  addComment,
} = articleSlice.actions;
export default postsSlice.reducer;
