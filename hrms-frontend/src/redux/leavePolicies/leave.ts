import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allLeavesPolicies: [],
  totalleavesPolicies: 0,
  isCall: false,
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
    resetLeaves(state) {
      state.allLeavesPolicies = [];
      state.totalleavesPolicies = 0;
    },
    resetIsCall(state, action) {
      state.isCall = action.payload;
    },
  },
});

export const {
  setallLeavesPolicies,
  settotalleavesPolicies,
  resetLeaves,
  resetIsCall,
} = leavePoliciesSlice.actions;
export default leavePoliciesSlice.reducer;
