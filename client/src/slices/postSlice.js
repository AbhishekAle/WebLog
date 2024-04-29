import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const initialState = {
  postData: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },
  },
});

export const { setPostData } = postSlice.actions;

export default postSlice.reducer;
