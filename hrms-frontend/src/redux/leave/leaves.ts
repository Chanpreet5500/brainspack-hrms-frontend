import { DateFormatConvertor } from "@/constants/commonFunction";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allLeaves: [],
    totalleaves: 0

};

const filterData = (data: any) => {
    return data.map((leave: any) => ({
        name: `${leave.employee_id.fname} ${leave.employee_id.lname}`,
        leavetype: leave.leave_type,
        startdate: DateFormatConvertor(leave.start_date),
        enddate: DateFormatConvertor(leave.end_date),
        status: leave.status,

    }));
}

const leaveSlice = createSlice({
    name: "leaveSlice",
    initialState,
    reducers: {
        setallLeaves(state, action) {
            console.log(action.payload, 2)
            state.allLeaves = filterData(action.payload);
        },
        settotalleaves(state, action) {
            state.totalleaves = action.payload
        },
        resetLeaves(state) {
            state.allLeaves = [];
            state.totalleaves = 0;
        },
    },
});

export const {
    setallLeaves,
    settotalleaves,
    resetLeaves
} = leaveSlice.actions;
export default leaveSlice.reducer;
