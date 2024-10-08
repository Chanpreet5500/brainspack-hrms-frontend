import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userGetApi = createApi({
  reducerPath: "userGetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/users",
  }),
  endpoints: (builder) => ({
    getAllDataApiByName: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `${page}/${limit}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useLazyGetAllDataApiByNameQuery } = userGetApi;
export default userGetApi;
