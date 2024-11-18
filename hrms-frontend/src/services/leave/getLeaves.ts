import { baseUrl } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const leavesApi = createApi({
  reducerPath: "leavesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllLeaveDataApiByName: builder.query({
      query: ({ page, limit, search, token }) => {
        return {
          url: `leaves/`,
          method: "GET",
          params: { page, limit, search },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    createLeave: builder.mutation({
      query: ({ createdById, leavedata, token }) => {
        return {
          url: `/leaves/${createdById}`,
          method: "POST",
          body: leavedata,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateLeaveDataApiByName: builder.mutation({
      query: ({ leaveId, status, updatedById, token }) => {
        return {
          url: `/leaves/update/${updatedById}/${leaveId}?status=${status}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});
export const {
  useLazyGetAllLeaveDataApiByNameQuery,
  useCreateLeaveMutation,
  useUpdateLeaveDataApiByNameMutation,
} = leavesApi;
export default leavesApi;
