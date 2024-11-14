import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
  }),
  endpoints: (builder) => ({
    createProjectApi: builder.mutation({
      query: (props) => {
        const { data, token } = props;
        return {
          url: `/projects/create/${data?.assigned_by}`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAllProjectByName: builder.query({
      query: ({ page, limit, search, token }) => {
        return {
          url: `/projects/`,
          method: "GET",
          params: { page, limit, search },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateProjectApi: builder.mutation({
      query: ({ data, updatedById, token }) => {
        return {
          url: `/projects/update/${updatedById}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteProjectApi: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/projects/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useCreateProjectApiMutation,
  useLazyGetAllProjectByNameQuery,
  useUpdateProjectApiMutation,
  useDeleteProjectApiMutation,
} = projectApi;
export default projectApi;
