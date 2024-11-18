import { baseUrl } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
      query: ({ data, token, authUser }) => {
        return {
          url: `/users/create/${authUser.userId}`,
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
