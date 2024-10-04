import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const leavesApi = createApi({
    reducerPath: "leavesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
    }),
    endpoints: (builder) => ({
        getAllLeaveDataApiByName: builder.query({
            query: ({ page, limit, search }) => {
                return {
                    url: 'leaves',
                    method: "GET",
                    params: { page, limit, search }
                };
            },
        }),
        createLeave: builder.mutation({
            query: ({ createdById, leavedata }) => {
                return {
                    url: `/leaves/${createdById}`,
                    method: "POST",
                    body: leavedata
                }
            }
        }),

    }),
});
export const { useLazyGetAllLeaveDataApiByNameQuery, useCreateLeaveMutation } = leavesApi;
export default leavesApi;
