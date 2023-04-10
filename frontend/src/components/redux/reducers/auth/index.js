import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    pfp: localStorage.getItem("pfp") || null,
    role: localStorage.getItem("role") || null,
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
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("role", state.role);
      localStorage.setItem("pfp", state.pfp);
    },

    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.role = null;
      state.pfp = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLogin, setUserInfo, setLogout } = authSlice.actions;
export default authSlice.reducer;
