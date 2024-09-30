import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allLeaves: [],
    totalleaves: []

};

const filterData = (data: any) => {
    return data.map((leave: any) => ({
        name: `${leave.employee_id.fname} ${leave.employee_id.lname}`,
        leavetype: leave.leave_type,
        startdate: leave.start_date,
        enddate: leave.end_date,
        status: leave.status,

    }));
}

const leaveSlice = createSlice({
    name: "leaveSlice",
    initialState,
    reducers: {
        setallLeaves(state, action) {
            state.allLeaves = filterData(action.payload);
        },
        settotalleaves(state, action) {
            state.totalleaves = action.payload
        }
    },
});

export const {
    setallLeaves,
    settotalleaves
} = leaveSlice.actions;
export default leaveSlice.reducer;
