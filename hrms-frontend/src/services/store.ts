import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../redux/user/user";
import leaveSliceReducer from "../redux/leave/leaves";
import leavesGetApi from "./leave/getLeaves";
import usersApi from "./user/usersApi";
import leavePoliciesApi from "./leavePolicies/leavesApi";
import leavePoliciesSliceReducer from "../redux/leavePolicies/leave";
import typePoliciesReducer from "../redux/typePolicies/type";
import typePoliciesApi from "./typePolicies/typeApi";

export const makeStore = configureStore({
  reducer: {
    [leavesGetApi.reducerPath]: leavesGetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [leavePoliciesApi.reducerPath]: leavePoliciesApi.reducer,
    [typePoliciesApi.reducerPath]: typePoliciesApi.reducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer,
    leavePoliciesSlice: leavePoliciesSliceReducer,
    typePoliciesSlice: typePoliciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      leavesGetApi.middleware,
      usersApi.middleware,
      leavePoliciesApi.middleware,
      typePoliciesApi.middleware
    ),
});
