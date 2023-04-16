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
        },setUserPosts: (state, action) => {
            state.UserPosts = action.payload;
        },setFollowing: (state, action) => {
            state.following = action.payload;
        },
    },
    
});

export const {
    setUserData,
    setUserPosts,
    updateUserImage,
    setRandomNumber,
    setFollowing,
} = profileSlice.actions;
export default profileSlice.reducer;
