import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    authUser: null,
    authToken: null
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
        },
        setAuthToken(state, action) {
            state.authToken = action.payload
        }
    },
});

export const { setAuthUser, resetAuthUser, setAuthToken } =
    authUserSlice.actions;
export default authUserSlice.reducer;
