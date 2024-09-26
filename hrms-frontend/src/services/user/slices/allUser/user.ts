import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      // console.log(state, action.payload, "m");
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;