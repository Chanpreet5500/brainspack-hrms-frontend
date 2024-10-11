// "use client";

// import { DataTable } from "mantine-datatable";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { manageUserSelector } from "@/redux/user/userSelector";
// import {
//   IconEdit,
//   IconLock,
//   IconLockOpen,
//   IconTrash,
// } from "@tabler/icons-react";
// const PAGE_SIZE = 5;

// export default function PaginationExample(
//   form: any,
//   updateStatus: any,
//   deleteModal: any
// ) {
//   const { allUserDataLength, allUserData } = useSelector(manageUserSelector);
//   const [page, setPage] = useState(1);
//   const [records, setRecords] = useState(allUserData.slice(0, PAGE_SIZE));
//   const [currentpage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     const from = (page - 1) * PAGE_SIZE;
//     const to = from + PAGE_SIZE;
//     setRecords(allUserData.slice(from, to));
//   }, [page]);
//   type TableRow = {
//     id: number;
//     fname: string;
//     lname: string;
//     email: string;
//     role: string;
//     department: string;
//     status: string;
//     isActive: boolean;
//     columns?: [];
//   };
//   return (
//     <DataTable
//       height={300}
//       withTableBorder
//       records={records}
//       columns={[
//         {
//           accessor: "id",
//           title: "S.No.",
//           width: "40%",
//           render: (record: any, index: number) =>
//             (currentpage - 1) * PAGE_SIZE + index + 1,
//         },

//         { accessor: "fname", width: "40%" },
//         { accessor: "lname", width: "60%" },
//         { accessor: "email", width: "60%" },
//         { accessor: "role", width: "60%" },
//         { accessor: "department", width: "60%" },
//         {
//           accessor: "status",
//           width: "60%",
//           render: (data: TableRow) => {
//             return <div>{data.isActive ? "Active" : "Inactive"}</div>;
//           },
//         },
//         {
//           accessor: "Action",
//           width: "60%",
//           render: (data: TableRow) => {
//             const editModal = (row: TableRow) => {
//               open();
//               form.setValues(row);
//             };
//             return (
//               <div className="flex gap-2">
//                 <button onClick={() => editModal(data)}>
//                   <IconEdit className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
//                 </button>
//                 <button onClick={() => deleteModal(data)}>
//                   <IconTrash className="h-[25px] w-[25px] text-red-500 cursor-pointer" />
//                 </button>
//                 {data.isActive ? (
//                   <button onClick={() => updateStatus(data)}>
//                     <IconLockOpen className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
//                   </button>
//                 ) : (
//                   <button onClick={() => updateStatus(data)}>
//                     <IconLock className="h-[25px] w-[25px] text-red-500 cursor-pointer" />
//                   </button>
//                 )}
//               </div>
//             );
//           },
//         },
//       ]}
//       totalRecords={allUserDataLength}
//       recordsPerPage={PAGE_SIZE}
//       page={page}
//       onPageChange={(p) => setPage(p)}
//     />
//   );
// }
