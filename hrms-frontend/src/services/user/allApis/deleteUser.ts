// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// export const deleteApi = createApi({
//   reducerPath: "deleteApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3000/api/users",
//   }),
//   endpoints: (builder) => ({
//     deleteDataApiByName: builder.mutation({
//       query: ({ owner_id, user_id }) => {
//         return {
//           url: `delete/${owner_id}/${user_id}`,
//           method: "DELETE",
//         };
//       },
//     }),
//   }),
// });

// export const { useDeleteDataApiByNameMutation } = deleteApi;
// export default deleteApi;
