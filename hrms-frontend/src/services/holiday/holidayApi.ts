import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const holidayApi = createApi({
    reducerPath: "holidayApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api/holidays",
    }),
    endpoints: (builder) => ({
        deleteHolidayDataApiByName: builder.mutation({
            query: (holiday_id) => {
                return {
                    url: `/delete/${holiday_id}`,
                    method: "Delete",
                    body: {},
                };
            },
        }),

        getAllHolidayDataApiByName: builder.query({
            query: () => {
                return {
                    url: `/`,
                    method: "GET",
                };
            },
        }),

        createHoliday: builder.mutation({
            query: (body) => {
                return {
                    url: `/create/66f532c42bb990137501740f`,
                    method: "POST",
                    body: body,
                };
            },
        }),

        updateHolidayDataApiByName: builder.mutation({
            query: (data) => {
                return {
                    url: `/update/670cc1cf4360edebf2074093`,
                    method: "PATCH",
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useDeleteHolidayDataApiByNameMutation,
    useLazyGetAllHolidayDataApiByNameQuery,
    useCreateHolidayMutation,
    useUpdateHolidayDataApiByNameMutation
} = holidayApi;
export default holidayApi;
