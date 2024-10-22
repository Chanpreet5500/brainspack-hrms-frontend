import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    holiday: null,
    selectedMode: "",
    editData: {},
    deleteData: {},
    modalVisibility: false,
    allData: [],
    allDataLength: 0,
};

const holidaySlice = createSlice({
    name: "holidaySlice",
    initialState,
    reducers: {
        setholiday(state, action) {
            state.holiday = action.payload;
        },
        updateSelectedMode(state, action) {
            state.selectedMode = action.payload;
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
        updateModalVisibility(state, action) {
            state.modalVisibility = action.payload;
        },
        getAllholidayData(state, action) {
            state.allData = action.payload;
        },
        setholidayDataLength(state, action) {
            state.allDataLength = action.payload;
        },
    },
});

export const {
    setholiday,
    updateSelectedMode,
    updateholidayEditData,
    deleteholidayEditData,
    clearholiday,
    updateModalVisibility,
    getAllholidayData,
    setholidayDataLength
} = holidaySlice.actions;

export default holidaySlice.reducer;
