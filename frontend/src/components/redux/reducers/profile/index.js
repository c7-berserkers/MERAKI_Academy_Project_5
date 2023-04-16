import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        UserData: {},
        UserPosts:[],
        RandomNumber: false,
        following :[],
    },
    reducers: {
        setUserData: (state, action) => {
            state.UserData = action.payload;
        }, 
        updateUserImage: (state, action) => {
            state.UserData.img = action.payload;
        },
        setRandomNumber: (state, action) => {
            state.RandomNumber = action.payload;
        },
        setUserPosts: (state, action) => {
            state.UserPosts = action.payload;
        },
        setFollowing: (state, action) => {
            state.following = action.payload;
        },
        setFollowing_plus1: (state, action) => {
            state.UserData.followers_count = state.UserData.followers_count*1+1;
        },setFollowing_minus1: (state, action) => {
            state.UserData.followers_count = state.UserData.followers_count*1-1;
        },
    },
    
});

export const {
    setUserData,
    setUserPosts,
    updateUserImage,
    setRandomNumber,
    setFollowing,
    setFollowing_plus1,
    setFollowing_minus1,
} = profileSlice.actions;
export default profileSlice.reducer;
