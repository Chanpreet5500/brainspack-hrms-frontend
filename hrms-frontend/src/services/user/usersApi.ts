import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    deleteDataApiByName: builder.mutation({
      query: ({ owner_id, user_id }) => {
        return {
          url: `/users/delete/${owner_id}/${user_id}`,
          method: "PATCH",
          body: { owner_id, user_id },
        };
      },
    }),

    getAllDataApiByName: builder.query({
      query: ({ page, limit, search }) => {
        return {
          url: `users/`,
          method: "GET",
          params: { page, limit, search },
        };
      },
    }),

    createUser: builder.mutation({
      query: (body) => {
        return {
          url: `/users/create/66fa781382603080b4a64da3`,
          method: "POST",
          body: body,
        };
      },
    }),

    updateDataApiByName: builder.mutation({
      query: ({ owner_id, user_id, data }) => {
        return {
          url: `/users/update/${owner_id}/${user_id}`,
          method: "PUT",
          body: data,
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
} = usersApi;
export default usersApi;
