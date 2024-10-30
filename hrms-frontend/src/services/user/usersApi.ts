import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import {
  createApi,
  fetchBaseQuery,
  RootState,
} from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzEwZjk2OTFlZTNjODI0Nzk1ZjhlZGYiLCJlbWFpbCI6ImthdXNoYWxzaHViaGFtNDYwQGdtYWlsLmNvbSIsImZuYW1lIjoiU2h1YmhhbSIsImxuYW1lIjoiS2F1c2hhbCIsInJvbGUiOiJlbXBsb3llZSIsImRlcGFydG1lbnQiOiJpdCIsImlzQWN0aXZlIjp0cnVlLCJpbWciOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKVUI5X0ZpdVM0QlR4bVlBM2UtMzJzWWlwZG5TQ1BDV1hVZVFmem1IZDQ2U0VyYlNyZT1zOTYtYyIsImlhdCI6MTczMDA5NzA3NCwiZXhwIjoxNzMwMTgzNDc0fQ.i2FCO5d3jLdJPfiDQ8V6JdyE2i5k7_SEQI442sqWwO0'
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers, { getState }) => {
      // const { authToken } = getState().authUser;
      // const authToken
      // const state = getState() as RootState;
      // const authToken = state.authUser.authToken;
      // headers.set('Authorization', `Bearer ${authToken}`);
      // return headers;
    },
  }),
  endpoints: (builder) => ({
    deleteDataApiByName: builder.mutation({
      query: ({ owner_id, user_id, token }) => {
        return {
          url: `/users/delete/${owner_id}/${user_id}`,
          method: "PATCH",
          body: { owner_id, user_id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getAllDataApiByName: builder.query({
      query: ({ page, limit, search, token }) => {
        return {
          url: `users/`,
          method: "GET",
          params: { page, limit, search },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    createUser: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: `/users/create/66fa781382603080b4a64da3`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    updateDataApiByName: builder.mutation({
      query: ({ owner_id, user_id, data, token }) => {
        return {
          url: `/users/update/${owner_id}/${user_id}`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    registerDataApiByName: builder.mutation({
      query: ({ email, img, token }) => {
        return {
          url: `/users/login`,
          method: "POST",
          body: { img },
          params: { email },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useDeleteDataApiByNameMutation,
  useLazyGetAllDataApiByNameQuery,
  useCreateUserMutation,
  useUpdateDataApiByNameMutation,
  useRegisterDataApiByNameMutation,
} = usersApi;
export default usersApi;
