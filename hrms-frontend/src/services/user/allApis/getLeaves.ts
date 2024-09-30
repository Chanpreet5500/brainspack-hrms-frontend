import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const leavesGetApi = createApi({
    reducerPath: "leavesGetApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/leaves",
    }),
    endpoints: (builder) => ({
        getAllLeaveDataApiByName: builder.query({
            query: ({ page, limit }) => {
                return {
                    url: `/${page}/${limit}`,
                    method: "GET",
                };
            },
        }),
    }),
});
export const { useGetAllLeaveDataApiByNameQuery } = leavesGetApi;
export default leavesGetApi;
