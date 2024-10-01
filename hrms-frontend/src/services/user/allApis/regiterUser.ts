import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userRegisterApi = createApi({
  reducerPath: "userRegisterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/users" }),
  endpoints: (builder) => ({
    getCreateUser: builder.mutation({
      query: (body) => {
        return {
          url: `/create/66fa781382603080b4a64da3`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});
export const { useGetCreateUserMutation } = userRegisterApi;
export default userRegisterApi;
