import { configureStore } from "@reduxjs/toolkit";
// import userRegisterApi from "./user/regiterUser";
// import userGetApi from "./user/getUser";
import userSliceReducer from "../redux/user/user";
import leaveSliceReducer from "../redux/leave/leaves";
import leavesGetApi from "./leave/getLeaves";
import usersApi from "./user/usersApi";

export const makeStore = configureStore({
  reducer: {
    // [userGetApi.reducerPath]: userGetApi.reducer,
    [leavesGetApi.reducerPath]: leavesGetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // userGetApi.middleware,
      leavesGetApi.middleware,
      usersApi.middleware
    ),
});
