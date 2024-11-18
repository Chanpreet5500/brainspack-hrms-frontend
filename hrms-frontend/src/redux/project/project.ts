import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProjects: [],
  totalProjects: 0,
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setAllProject(state, action) {
      state.allProjects = action.payload;
    },
    setTotalProjects(state, action) {
      state.totalProjects = action.payload;
    },

    resetProjects(state) {
      state.allProjects = [];
      state.totalProjects = 0;
    },
  },
});

export const { setAllProject, setTotalProjects, resetProjects } =
  projectSlice.actions;
export default projectSlice.reducer;
