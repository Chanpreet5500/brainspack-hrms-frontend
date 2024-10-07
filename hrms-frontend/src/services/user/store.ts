import { configureStore } from "@reduxjs/toolkit";
import userGetApi from "./allApis/getUser";
import userSliceReducer from "./slices/allUser/user";
import leaveSliceReducer from "./slices/allLeaves/leaves";
import leavesGetApi from "./allApis/getLeaves";
import usersApi from "./allApis/usersApi";

export const makeStore = configureStore({
  reducer: {
    [userGetApi.reducerPath]: userGetApi.reducer,
    [leavesGetApi.reducerPath]: leavesGetApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    userSlice: userSliceReducer,
    leaveSlice: leaveSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userGetApi.middleware,
      leavesGetApi.middleware,
      usersApi.middleware
    ),
});
