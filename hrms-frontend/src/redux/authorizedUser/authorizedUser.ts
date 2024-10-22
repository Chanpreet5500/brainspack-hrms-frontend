import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    authUser: null
};

const authUserSlice = createSlice({
    name: "authUserSlice",
    initialState,
    reducers: {
        setAuthUser(state, action) {
            state.authUser = action.payload;
        },
        resetAuthUser(state) {
            state.authUser = null
        }
    },
});

export const { setAuthUser, resetAuthUser } =
    authUserSlice.actions;
export default authUserSlice.reducer;
