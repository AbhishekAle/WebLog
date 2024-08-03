import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: "",
  videoData: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
    setVideoData: (state, action) => {
      state.videoData = action.payload;
    },
  },
});

export const { setPostData, setVideoData } = postSlice.actions;

export default postSlice.reducer;
