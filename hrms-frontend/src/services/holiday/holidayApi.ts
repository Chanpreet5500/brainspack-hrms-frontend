import { baseUrl } from "@/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const holidayApi = createApi({
  reducerPath: "holidayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),

  endpoints: (builder) => ({
    deleteHolidayDataApiByName: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: `/holidays/delete/${data}`,
          method: "Delete",
          body: {},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getAllHolidayDataApiByName: builder.query({
      query: ({ token }) => {
        return {
          url: `/holidays/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    createHoliday: builder.mutation({
      query: ({ data, owner_id, token }) => {
        return {
          url: `/holidays/create/${owner_id}`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    updateHolidayDataApiByName: builder.mutation({
      query: ({ data, owner_id, token }) => {
        return {
          url: `/holidays/update/${owner_id}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useDeleteHolidayDataApiByNameMutation,
  useLazyGetAllHolidayDataApiByNameQuery,
  useCreateHolidayMutation,
  useUpdateHolidayDataApiByNameMutation,
} = holidayApi;
export default holidayApi;
