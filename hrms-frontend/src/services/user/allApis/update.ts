import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userGetApi = createApi({
  reducerPath: "userGetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllDataApiByName: builder.query({
      query: () => {
        return {
          url: "/posts",
          method: "GET",
        };
      },
    }),
  }),
});
export const { useLazyGetAllDataApiByNameQuery } = userGetApi;
export default userGetApi;
