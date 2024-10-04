import { configureStore } from "@reduxjs/toolkit";
import userRegisterApi from "./user/regiterUser";
import userGetApi from "./user/getUser";
import userSliceReducer from "../redux/user/user";
import leaveSliceReducer from "../redux/leave/leaves"
import leavesGetApi from "./leave/getLeaves";

export const makeStore = configureStore({
  reducer: {
    [userRegisterApi.reducerPath]: userRegisterApi.reducer,
    [userGetApi.reducerPath]: userGetApi.reducer,
    [leavesGetApi.reducerPath]: leavesGetApi.reducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userRegisterApi.middleware,
      userGetApi.middleware,
      leavesGetApi.middleware
    ),
});
