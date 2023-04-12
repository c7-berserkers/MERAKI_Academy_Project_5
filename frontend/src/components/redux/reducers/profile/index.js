import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        UserData: {},
        UserPosts:[],
    },
    reducers: {
        setUserData: (state, action) => {
            state.UserData = action.payload;
        },
        setUserPosts: (state, action) => {
            state.UserPosts = action.payload;
        },
    },
    
});

export const {
    setUserData,
    setUserPosts
} = profileSlice.actions;
export default profileSlice.reducer;
