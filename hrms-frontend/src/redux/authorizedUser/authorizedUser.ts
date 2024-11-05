import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authUser: null,
  authToken: null,
  authorized: true
};

const authUserSlice = createSlice({
  name: "authUserSlice",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
    resetAuthUser(state) {
      state.authUser = null;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    setauthorized(state, action) {
      state.authorized = action.payload;
    },
  },
});

export const { setAuthUser, resetAuthUser, setAuthToken, setauthorized } =
  authUserSlice.actions;
export default authUserSlice.reducer;
