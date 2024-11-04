import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTypesPolicies: [],
  totalTypePolicies: 0,
};

const typePoliciesSlice = createSlice({
  name: "typePoliciesSlice",
  initialState,
  reducers: {
    setallTypesPolicies(state, action) {
      state.allTypesPolicies = action.payload;
    },
    settotalTypePolicies(state, action) {
      state.totalTypePolicies = action.payload;
    },
  },
});

export const { setallTypesPolicies, settotalTypePolicies } =
  typePoliciesSlice.actions;
export default typePoliciesSlice.reducer;
