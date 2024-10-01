import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  selectedMode: "",
  editData: {},
  deleteData: {},
  modalVisibility: false,
  allUserData: [],
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
    updateUserEditData(state, action) {
      state.editData = action.payload;
    },
    deleteUserEditData(state, action) {
      state.deleteData = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateModalVisibility(state, action) {
      state.modalVisibility = action.payload;
    },
    getAllUserData(state, action) {
      state.allUserData = action.payload;
    },
  },
});

export const {
  updateUserEditData,
  updateSelectedMode,
  deleteUserEditData,
  setUser,
  clearUser,
  updateModalVisibility,
  getAllUserData,
} = userSlice.actions;
export default userSlice.reducer;
