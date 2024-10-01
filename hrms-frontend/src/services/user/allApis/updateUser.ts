import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const updateApi = createApi({
  reducerPath: "updateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/users",
  }),
  endpoints: (builder) => ({
    updateDataApiByName: builder.mutation({
      query: ({ owner_id, user_id, data }) => {
        return {
          url: `update/${owner_id}/${user_id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const { useUpdateDataApiByNameMutation } = updateApi;
export default updateApi;
