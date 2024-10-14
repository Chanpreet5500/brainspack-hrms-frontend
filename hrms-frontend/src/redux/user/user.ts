import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "",
  selectedMode: "",
  editData: {},
  deleteData: {},
  modalVisibility: false,
  allUserData: [],
  allUserDataLength: 0,
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
    setUserDataLength(state, action) {
      state.allUserDataLength = action.payload;
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
  setUserDataLength,
} = userSlice.actions;

export default userSlice.reducer;
