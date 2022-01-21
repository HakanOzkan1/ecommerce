import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    currentUser: null,
    fetching: false,
    err: false,
  },
  reducers: {
    registerStart: (state) => {
      state.fetching = true;
    },
    registerSuccess: (state, action) => {
      state.fetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.fetching = false;
      state.err = true;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } = registerSlice.actions;
export default registerSlice.reducer;
