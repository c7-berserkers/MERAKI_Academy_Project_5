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
      state.posts.splice(0, 0, payload);
    },
    updatePosts: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        return post.id === payload.id ? payload : post;
      });
    },
    deletePosts: (state, { payload }) => {
      state.posts = state.posts.filter((post) => {
        return post.id != payload;
      });
    },
    setComments: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id == payload.post_id) {
          post.comments = payload.comments;
        }
        return post;
      });
    },
    addComment: (state, { payload }) => {
      console.log("payload", payload);
      state.posts = state.posts.map((post) => {
        if (post.id === payload.post_id) {
          if (post.comments) {
            post.comments.push(payload.comment);
          } else {
            post.comments = [payload.comment];
          }
        }
        return post;
      });
    },
    deleteComment: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload.post_id) {
          post.comments = post.comments.filter((comment) => {
            return comment.id !== payload.id;
          });
        }
        return post;
      });
    },
    updateComment: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id == payload.post_id) {
          post.comments = post.comments.map((comment) => {
            if (comment.id == payload.id) {
              comment.comment = payload.comment;
            }
            return comment;
          });
        }
        return post;
      });
    },
    addLikePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload) post.likes_count++;
        return post;
      });
    },
    removeLikePost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload) post.likes_count--;
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
  deleteComment,
  updateComment,
  addLikePost,
  removeLikePost,
} = postsSlice.actions;
export default postsSlice.reducer;
