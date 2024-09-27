import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  selectedMode: "",
  editData: {},
  modalVisibility: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    updateSelectedMode(state, action) {
      state.selectedMode = action.payload;
    },
    updateEditData(state, action) {
      state.editData = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateModalVisibility(state, action) {
      state.modalVisibility = action.payload;
    },
  },
});

export const {
  updateEditData,
  updateSelectedMode,
  setUser,
  clearUser,
  updateModalVisibility,
} = userSlice.actions;
export default userSlice.reducer;
