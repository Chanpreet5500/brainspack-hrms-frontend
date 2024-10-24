import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allLeavesPolicies: [],
  totalleavesPolicies: 0,
};

const leavePoliciesSlice = createSlice({
  name: "leavePoliciesSlice",
  initialState,
  reducers: {
    setallLeavesPolicies(state, action) {
      state.allLeavesPolicies = action.payload;
    },
    settotalleavesPolicies(state, action) {
      state.totalleavesPolicies = action.payload;
    },
    updateLeavePoliciesStatus: (state, action) => {
      console.log(state, "kkkk");
    },
    resetLeaves(state) {
      state.allLeavesPolicies = [];
      state.totalleavesPolicies = 0;
    },
  },
});

export const {
  setallLeavesPolicies,
  settotalleavesPolicies,
  updateLeavePoliciesStatus,
  resetLeaves,
} = leavePoliciesSlice.actions;
export default leavePoliciesSlice.reducer;
