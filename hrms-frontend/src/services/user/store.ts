import { configureStore } from "@reduxjs/toolkit";
import userRegisterApi from "./allApis/regiterUser";
import userGetApi from "./allApis/getUser";
import userSliceReducer from "./slices/allUser/user";

export const makeStore = configureStore({
  reducer: {
    [userRegisterApi.reducerPath]: userRegisterApi.reducer,
    [userGetApi.reducerPath]: userGetApi.reducer,
    userSlice: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userRegisterApi.middleware,
      userGetApi.middleware
    ),
});
