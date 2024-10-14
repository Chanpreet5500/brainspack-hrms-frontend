// import { Pagination } from "@mantine/core";

// interface CustomPaginationProps {
//   handlePageChange: (page: number) => void;
//   page: number;
//   total: number;
//   limit: number;

// }
// const CustomPagination: React.FC<CustomPaginationProps> = ({
//   handlePageChange,
//   page,
//   total,
//   limit,
// }) => {
//   const totalCount = Math.ceil(total / limit);
//   return (
//     <Pagination
//       total={totalCount}
//       value={page}
//       onChange={(p) => handlePageChange(p)}
//       getItemProps={(page) => ({
//         onClick: () => {
//           handlePageChange(page);
//         },
//       })}
//     />
//   );
// };
// export default CustomPagination;
