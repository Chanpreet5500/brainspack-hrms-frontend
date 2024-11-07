import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const leavePoliciesApi = createApi({
  reducerPath: "leavePoliciesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
  }),
  endpoints: (builder) => ({
    getAllLeavePoliciesApiApiByName: builder.query({
      query: ({ page, limit, search, token }) => {
        return {
          url: `/leave-policies`,
          method: "GET",
          params: { page, limit, search },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    createLeavePoliciesApi: builder.mutation({
      query: (props) => {
        const data = {
          leave_type_id: props?.leave_type_id,
          max_leaves_per_year: props?.max_leaves_per_year,
        };
        return {
          url: `/leave-policies/create`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${props?.token}`,
          },
        };
      },
    }),
    updateLeavePoliciesApiByName: builder.mutation({
      query: ({ data, token }) => {
        const { leave_policy_id, max_leaves_per_year } = data;
        return {
          url: `/leave-policies/update/${leave_policy_id}`,
          method: "PUT",
          body: { max_leaves_per_year },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useLazyGetAllLeavePoliciesApiApiByNameQuery,
  useCreateLeavePoliciesApiMutation,
  useUpdateLeavePoliciesApiByNameMutation,
} = leavePoliciesApi;
export default leavePoliciesApi;
