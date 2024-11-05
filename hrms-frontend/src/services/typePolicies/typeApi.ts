import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const typePoliciesApi = createApi({
  reducerPath: "typePoliciesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
  }),
  endpoints: (builder) => ({
    createTypePoliciesApi: builder.mutation({
      query: (body) => {
        return {
          url: `/leave-policies/create-type`,
          method: "POST",
          body,
        };
      },
    }),
    updateLeaveTypeApiByName: builder.mutation({
      query: ({ leaveTypeID, data, token }) => {
        return {
          url: `/leave-policies/update-type/${leaveTypeID}`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAllLeaveTypePoliciesApiByName: builder.query({
      query: ({ page, limit, search, token }) => {
        return {
          url: `/leave-policies/types`,
          method: "GET",
          params: { page, limit, search },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});
export const {
  useCreateTypePoliciesApiMutation,
  useLazyGetAllLeaveTypePoliciesApiByNameQuery,
  useUpdateLeaveTypeApiByNameMutation,
} = typePoliciesApi;
export default typePoliciesApi;
