"use client";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar/Searchbar";
import { tableDataLimit } from "@/constants/constants";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { manageLeaveSelector } from "@/redux/leave/leaveSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  resetLeaves,
  setallLeaves,
  settotalleaves,
} from "@/redux/leave/leaves";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconMoodSad } from "@tabler/icons-react";
import { Box, Button, Group, Loader } from "@mantine/core";
import {
  useCreateLeaveMutation,
  useLazyGetAllLeaveDataApiByNameQuery,
  useUpdateLeaveDataApiByNameMutation,
} from "@/services/leave/getLeaves";
import { DataTable } from "mantine-datatable";
import { StringDateFormatConvertor } from "@/utils/commonFunction";
import { notifications } from "@mantine/notifications";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import LeaveForm from "@/containers/Leave/Leaveform";

const initialState = {
  allLeaves: [],
  totalleaves: 0,
};

export default function LeaveComponent() {
  const [loading, setLoading] = useState(true);
  const [createLeave, { isLoading, error, isSuccess: createSuccess }] =
    useCreateLeaveMutation();
  const [currentpage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState({});
  const [trigger] = useLazyGetAllLeaveDataApiByNameQuery();
  const [updateLeave] = useUpdateLeaveDataApiByNameMutation();
  const { allLeaves, totalleaves } = useSelector(manageLeaveSelector);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const { authUser, authToken } = useSelector(manageAuthUserSelector);
  const [editopened, { open: editopen, close: editclose }] =
    useDisclosure(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    renderData(page, tableDataLimit, search);
  };

  const handleUpdate = async (data: any, status: string) => {
    try {
      const response = await updateLeave({
        leaveId: data._id,
        status,
        updatedById: authUser?.userId,
        token: authToken,
      });

      if (response.error) {
        console.error("Failed to update leave:", response.error);
      } else {
        console.log("Leave updated successfully:", response.data);
        renderData(currentpage, tableDataLimit, search);
      }
      {
        status == "rejected"
          ? notifications.show({
              color: "red",
              title: "Rejected",
              message: "Leave request rejected",
              position: "bottom-left",
            })
          : notifications.show({
              color: "green",
              title: "Approved",
              message: "Leave request approved",
              position: "bottom-left",
            });
      }
    } catch (err) {
      console.error("Error updating leave:", err);
    }
  };

  const renderData = async (
    currpage: number,
    limit: number,
    searchValue: string
  ) => {
    dispatch(resetLeaves());
    const response = await trigger({
      page: currpage,
      limit: limit,
      search: searchValue,
      token: authToken,
    });

    try {
      if (response.data) {
        dispatch(setallLeaves(response.data.leaves));
        dispatch(settotalleaves(response.data.totalLeaves));
      } else {
        console.error("Failed to fetch leaves.");
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (authToken) {
      renderData(currentpage, tableDataLimit, search);
    }
  }, [currentpage, createSuccess, authToken]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    renderData(currentpage, tableDataLimit, searchValue);
  };
  useEffect(() => {
    setLoading(false);
  }, [allLeaves.length > 0]);
  interface employeeData {
    fname: string;
    lname: string;
  }

  type TableRow = {
    employee_id: employeeData;
    id: number;
    email: string;
    role: string;
    department: string;
    status: string;
    isActive: boolean;
    columns?: [];
  };

  const records: any[] = allLeaves.slice(
    (currentpage - 1) * tableDataLimit,
    currentpage * tableDataLimit
  );

  const columns = [
    {
      accessor: "id",
      title: "S.No.",
      width: "5%",
      render: (record: any, index: number) =>
        (currentpage - 1) * tableDataLimit + index + 1,
    },
    {
      accessor: "Employee Name",
      width: "16%",
      render: (data: TableRow) => {
        return (
          <>
            {data?.employee_id.fname} {data?.employee_id.lname}
          </>
        );
      },
    },
    {
      accessor: "leave_type ",
      width: "16%",
      render: (data: any) => {
        return <>{data?.leave_type_id?.description}</>;
      },
    },
    {
      accessor: "start date for half",
      width: "20%",
      render: (data: any) => {
        const formattedDate = StringDateFormatConvertor(
          data.start_date,
          "DD/MM/YYYY"
        );
        return (
          <>
            {formattedDate} /
            {data?.start_day == "half"
              ? " " + data.start_half_day_time
              : " " + "full"}
          </>
        );
      },
    },

    {
      accessor: "end_date for half ",
      width: "20%",
      render: (data: any) => {
        const formattedDate = StringDateFormatConvertor(
          data.end_date,
          "DD/MM/YYYY"
        );
        return (
          <>
            {formattedDate} /
            {data?.end_day == "half"
              ? " " + data.end_half_day_time
              : " " + "full"}
          </>
        );
      },
    },

    { accessor: "status", width: "10%" },
    {
      accessor: "Action",
      width: "8%",

      render: (data: TableRow) => {
        const editModal = (row: TableRow) => {
          setUserData(row);
          editopen();
        };
        return (
          <div className="flex gap-2">
            <button onClick={() => editModal(data)}>
              <IconEdit className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between p-2 max-sm:flex-col-reverse">
        <div>Total Leaves ({totalleaves})</div>
        <div className="flex flex-grow gap-2 justify-end items-center w-[32%]  max-sm:w-full">
          <Searchbar
            value={search}
            handleSearch={handleSearchChange}
            placeholder="Search "
            iconcolor="#9ca3af"
          />
          <CustomModal
            opened={opened}
            onClose={close}
            open={open}
            size={"lg"}
            close={close}
            buttonlabel={"Add Leave"}
            modalTitle={"Apply for Leave"}
            content={
              <LeaveForm
                onClose={close}
                triggerCreate={createLeave}
                token={authToken}
                createSuccess={createSuccess}
                editBy={authUser?.userId}
              />
            }
          />
        </div>
      </div>
      {loading ? (
        <Box className="flex justify-center items-center p-4">
          <Loader color="blue" size="xl" />
        </Box>
      ) : allLeaves.length > 0 ? (
        <DataTable
          height={300}
          records={allLeaves}
          withTableBorder
          highlightOnHover
          totalRecords={totalleaves}
          recordsPerPage={tableDataLimit}
          page={currentpage}
          onPageChange={handlePageChange}
          columns={columns}
        />
      ) : (
        <Box className="flex flex-col justify-center items-center p-4">
          <IconMoodSad size={36} strokeWidth={1.5} color="grey" />
          <span>No Data Available</span>
        </Box>
      )}
      <div className="editIcon">
        <CustomModal
          opened={editopened}
          open={editopen}
          size={"lg"}
          close={editclose}
          showButton={false}
          modalTitle={"You Want to Approve the leave"}
          bgcolor={"transparent"}
          content={
            <div className="flex gap-3 flex-col">
              <h3>Please approve or reject the leave</h3>
              <Group justify="flex-end">
                <Button
                  variant="filled"
                  color="red"
                  onClick={() => {
                    handleUpdate(userData, "rejected");
                    editclose();
                  }}
                >
                  Reject
                </Button>
                <Button
                  style={{ backgroundColor: "#228be6" }}
                  variant="filled"
                  color="green"
                  onClick={() => {
                    handleUpdate(userData, "approved");
                    editclose();
                  }}
                >
                  Approve
                </Button>
              </Group>
            </div>
          }
        />
      </div>
    </>
  );
}
