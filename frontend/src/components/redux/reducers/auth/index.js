import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userName: localStorage.getItem("userName") || null,
    userId: localStorage.getItem("userId") || null,
    pfp: localStorage.getItem("pfp") || null,
    role: localStorage.getItem("role") || null,
    userLikes: JSON.parse(localStorage.getItem("userLikes")) ?? null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
    },
    setUserInfo: (state, { payload }) => {
      state.userId = payload.userId;
      state.role = payload.role;
      state.pfp = payload.img;
      state.userName = payload.first_name;
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("role", state.role);
      localStorage.setItem("pfp", state.pfp);
      localStorage.setItem("userName", state.userName);
    },
    setUserLikes: (state, { payload }) => {
      state.userLikes = payload;
      localStorage.setItem("userLikes", JSON.stringify(payload));
    },
    addLike: (state, { payload }) => {
      if (!state.userLikes) {
        state.userLikes = [payload];
        localStorage.setItem("userLikes", JSON.stringify(state.userLikes));
      } else {
        state.userLikes.push(payload);
        localStorage.setItem("userLikes", JSON.stringify(state.userLikes));
      }
    },
    removeLike: (state, { payload }) => {
      // state.userLikes = state.userLikes.filter((e) => {
      //   return e.post_id != payload;
      // });
      const num = state.userLikes.findIndex((e) => e.post_id == payload);
      state.userLikes = state.userLikes.splice(1, num);
      localStorage.setItem("userLikes", JSON.stringify(state.userLikes));
    },
    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.role = null;
      state.pfp = null;
      state.isLoggedIn = false;
      state.userName = null;
      state.userLikes = null;
      localStorage.clear();
    },
    setUserImg: (state, { payload }) => {
      state.pfp = payload.img;
      localStorage.setItem("pfp", state.pfp);
    },
    setUser_first_name: (state, { payload }) => {
      state.userName = payload.first_name;
    },
  },
});

export const {
  setLogin,
  setUserInfo,
  setLogout,
  setUserLikes,
  addLike,
  removeLike,
  setUserImg,
  setUser_first_name,
} = authSlice.actions;
export default authSlice.reducer;
