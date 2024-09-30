import { configureStore } from "@reduxjs/toolkit";
import userRegisterApi from "./allApis/regiterUser";
import userGetApi from "./allApis/getUser";
import userSliceReducer from "./slices/allUser/user";
import leaveSliceReducer from "./slices/allLeaves/leaves"
import leavesGetApi from "./allApis/getLeaves";

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
