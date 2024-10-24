import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leavePoliciesApi = createApi({
  reducerPath: "leavePoliciesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
  }),
  endpoints: (builder) => ({
    getAllLeavePoliciesApiApiByName: builder.query({
      query: ({ page, limit, search }) => {
        return {
          url: `/leave-policies`,
          method: "GET",
          params: { page, limit, search },
        };
      },
    }),
    getAllLeavePoliciesTypeApiApiByName: builder.query({
      query: ({ page, limit, search }) => {
        return {
          url: `/leave-policies/types`,
          method: "GET",
          params: { page, limit, search },
        };
      },
    }),

    createLeavePoliciesApi: builder.mutation({
      query: (body) => {
        return {
          url: `/leave-policies/create`,
          method: "POST",
          body: body,
        };
      },
    }),

    updateLeavePoliciesTypeApiApiByName: builder.mutation({
      query: ({ leave_type_id, data }) => {
        return {
          url: `/leave-policies/update/${leave_type_id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLazyGetAllLeavePoliciesApiApiByNameQuery,
  useLazyGetAllLeavePoliciesTypeApiApiByNameQuery,
  useCreateLeavePoliciesApiMutation,
  useUpdateLeavePoliciesTypeApiApiByNameMutation,
} = leavePoliciesApi;
export default leavePoliciesApi;
