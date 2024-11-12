import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    holiday: null,
    editData: {},
    deleteData: {},
    allData: [],
    change: false
};

const holidaySlice = createSlice({
    name: "holidaySlice",
    initialState,
    reducers: {
        setholiday(state, action) {
            state.holiday = action.payload;
        },
        updateholidayEditData(state, action) {
            state.editData = action.payload;
        },
        deleteholidayEditData(state, action) {
            state.deleteData = action.payload;
        },
        clearholiday(state) {
            state.holiday = null;
        },
        getAllholidayData(state, action) {
            state.allData = action.payload;
        },
        trackChange(state, action) {
            state.change = action.payload;
        },
    },
});

export const {
    setholiday,
    updateholidayEditData,
    deleteholidayEditData,
    clearholiday,
    getAllholidayData,
    trackChange
} = holidaySlice.actions;

export default holidaySlice.reducer;
