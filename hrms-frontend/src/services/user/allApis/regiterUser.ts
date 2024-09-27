import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userRegisterApi = createApi({
  reducerPath: "userRegisterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/users" }),
  endpoints: (builder) => ({
    getCreateUser: builder.mutation({
      query: (body) => {
        return {
          url: "/create",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});
export const { useGetCreateUserMutation } = userRegisterApi;
export default userRegisterApi;
