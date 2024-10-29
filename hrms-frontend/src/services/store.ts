import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../redux/user/user";
import leaveSliceReducer from "../redux/leave/leaves";
import authUserSliceReducer from "../redux/authorizedUser/authorizedUser";
import leavesGetApi from "./leave/getLeaves";
import usersApi from "./user/usersApi";
import leavePoliciesApi from "./leavePolicies/leavesApi";
import leavePoliciesSliceReducer from "../redux/leavePolicies/leave";
import typePoliciesReducer from "../redux/typePolicies/type";
import typePoliciesApi from "./typePolicies/typeApi";
import holidaySliceReducer from "../redux/holiday/holiday";
import holidayApi from "./holiday/holidayApi";

export const makeStore = configureStore({
  reducer: {
    [leavesGetApi.reducerPath]: leavesGetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [leavePoliciesApi.reducerPath]: leavePoliciesApi.reducer,
    [typePoliciesApi.reducerPath]: typePoliciesApi.reducer,
    [holidayApi.reducerPath]: holidayApi.reducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer,
    leavePoliciesSlice: leavePoliciesSliceReducer,
    typePoliciesSlice: typePoliciesReducer,
    authUserSlice: authUserSliceReducer,
    holidaySlice: holidaySliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      leavesGetApi.middleware,
      usersApi.middleware,
      leavePoliciesApi.middleware,
      typePoliciesApi.middleware,
      holidayApi.middleware
    ),
});
