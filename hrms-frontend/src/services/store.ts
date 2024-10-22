import { configureStore } from "@reduxjs/toolkit";
// import userRegisterApi from "./user/regiterUser";
// import userGetApi from "./user/getUser";
import userSliceReducer from "../redux/user/user";
import leaveSliceReducer from "../redux/leave/leaves";
import authUserSliceReducer from "../redux/authorizedUser/authorizedUser"
import leavesGetApi from "./leave/getLeaves";
import usersApi from "./user/usersApi";
import holidaySliceReducer from '../redux/holiday/holiday'
import holidayApi from "./holiday/holidayApi";

export const makeStore = configureStore({
  reducer: {
    // [userGetApi.reducerPath]: userGetApi.reducer,
    [leavesGetApi.reducerPath]: leavesGetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [holidayApi.reducerPath]: holidayApi.reducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer,
    authUserSlice: authUserSliceReducer,
    holidaySlice: holidaySliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // userGetApi.middleware,
      leavesGetApi.middleware,
      usersApi.middleware,
      holidayApi.middleware
    ),
});
