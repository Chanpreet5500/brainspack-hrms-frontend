import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allLeaves: [],
  totalleaves: 0,
};

const leaveSlice = createSlice({
  name: "leaveSlice",
  initialState,
  reducers: {
    setallLeaves(state, action) {
      state.allLeaves = action.payload;
    },
    settotalleaves(state, action) {
      state.totalleaves = action.payload;
    },
    updateLeaveStatus: (state, action) => {
      const { id, status, leaves } = action.payload;
      const leave = leaves?.find((leave: any) => {
        if (leave._id === id) {
          return leave;
        }
      });
    },
    resetLeaves(state) {
      state.allLeaves = [];
      state.totalleaves = 0;
    },
  },
});

export const { setallLeaves, settotalleaves, updateLeaveStatus, resetLeaves } =
  leaveSlice.actions;
export default leaveSlice.reducer;
