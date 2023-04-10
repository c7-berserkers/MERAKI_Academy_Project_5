import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
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
      state.pfp = payload.pfp;
      state.userName = payload.userName;
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("role", state.role);
      localStorage.setItem("pfp", state.pfp);
      localStorage.setItem("userName", payload.userName);
    },
    setUserLikes: (state, { payload }) => {
      state.userLikes = payload;
      localStorage.setItem("userLikes", JSON.stringify(payload));
    },
    addLike: (state, { payload }) => {
      state.userLikes.push(payload);
      localStorage.setItem("userLikes", JSON.stringify(state.userLikes));
    },
    removeLike: (state, { payload }) => {
      state.userLikes = state.userLikes.filter((e) => e.id !== payload);
      localStorage.setItem("userLikes", JSON.stringify(state.userLikes));
    },
    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.role = null;
      state.pfp = null;
      state.isLoggedIn = false;
      state.userName = null;
      localStorage.clear();
    },
  },
});

export const { setLogin, setUserInfo, setLogout,setUserLikes } = authSlice.actions;
export default authSlice.reducer;
