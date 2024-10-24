import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../redux/user/user";
import leaveSliceReducer from "../redux/leave/leaves";
import authUserSliceReducer from "../redux/authorizedUser/authorizedUser"
import leavesGetApi from "./leave/getLeaves";
import usersApi from "./user/usersApi";
import holidaySliceReducer from '../redux/holiday/holiday'
import holidayApi from "./holiday/holidayApi";
import leavePoliciesApi from "./leavePolicies/leavesApi";
import leavePoliciesSliceReducer from "../redux/leavePolicies/leave";

export const makeStore = configureStore({
  reducer: {
    [leavesGetApi.reducerPath]: leavesGetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [holidayApi.reducerPath]: holidayApi.reducer,
    [leavePoliciesApi.reducerPath]: leavePoliciesApi.reducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer,
    authUserSlice: authUserSliceReducer,
    holidaySlice: holidaySliceReducer,
    leavePoliciesSlice: leavePoliciesSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      leavesGetApi.middleware,
      usersApi.middleware,
      holidayApi.middleware,
      leavePoliciesApi.middleware
    ),
});
