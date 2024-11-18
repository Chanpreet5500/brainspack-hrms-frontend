"use client";
import { useDispatch, useSelector } from "react-redux";
import { manageLeaveSelector } from "@/redux/leave/leaveSelector";
import { useEffect, useState } from "react";
import {
  resetLeaves,
  setallLeaves,
  settotalleaves,
} from "@/redux/leave/leaves";
import { useDisclosure } from "@mantine/hooks";
import Searchbar from "@/components/Searchbar/Searchbar";
import { tableDataLimit } from "@/constants/constants";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { IconEdit, IconMoodSad } from "@tabler/icons-react";
import { Box, Button, Group, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useCreateLeaveMutation,
  useLazyGetAllLeaveDataApiByNameQuery,
  useUpdateLeaveDataApiByNameMutation,
} from "@/services/leave/getLeaves";
import { DataTable } from "mantine-datatable";
import { StringDateFormatConvertor } from "@/utils/commonFunction";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import LeaveForm from "@/containers/Leave/Leaveform";
interface EmployeeData {
  fname: string;
  lname: string;
}
interface LeaveData {
  _id: string;
  leave_type_id: {
    description: string;
  };
  start_date: string;
  start_day: string;
  start_half_day_time?: string;
  end_date: string;
  end_day: string;
  end_half_day_time?: string;
  status: string;
  employee_id: EmployeeData;
  isActive: boolean;
}
interface TableRow {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
  actions?: JSX.Element;
}
const initialState = {
  allLeaves: [] as LeaveData[],
  totalleaves: 0,
};
export default function LeaveComponent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [createLeave, { isLoading, error, isSuccess: createSuccess }] =
    useCreateLeaveMutation();
  const [currentpage, setCurrentPage] = useState<number>(1);
  const [userData, setUserData] = useState<LeaveData | null>(null);
  const [trigger] = useLazyGetAllLeaveDataApiByNameQuery();
  const [updateLeave] = useUpdateLeaveDataApiByNameMutation();
  const { allLeaves, totalleaves } = useSelector(manageLeaveSelector);
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const { authUser, authToken } = useSelector(manageAuthUserSelector);
  const [editopened, { open: editopen, close: editclose }] =
    useDisclosure(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    renderData(page, tableDataLimit, search);
  };
  const handleUpdate = async (data: LeaveData, status: string) => {
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

      notifications.show({
        color: status === "rejected" ? "red" : "green",
        title: status === "rejected" ? "Rejected" : "Approved",
        message: `Leave request ${
          status === "rejected" ? "rejected" : "approved"
        }`,
        position: "bottom-left",
      });
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
      console.error("Error fetching leaves:", error);
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

  const columns = [
    {
      accessor: "id",
      title: "S.No.",
      width: "5%",
      render: (record: LeaveData, index: number) =>
        (currentpage - 1) * tableDataLimit + index + 1,
    },
    {
      accessor: "Employee Name",
      width: "16%",
      render: (data: LeaveData) => {
        return (
          <>
            {data?.employee_id.fname} {data?.employee_id.lname}
          </>
        );
      },
    },
    {
      accessor: "leave_type",
      width: "16%",
      render: (data: LeaveData) => {
        return <>{data?.leave_type_id?.description}</>;
      },
    },
    {
      accessor: "start_date",
      width: "20%",
      render: (data: LeaveData) => {
        const formattedDate = StringDateFormatConvertor(
          data.start_date,
          "DD/MM/YYYY"
        );
        return (
          <>
            {formattedDate} /{" "}
            {data?.start_day === "half"
              ? ` ${data.start_half_day_time}`
              : " full"}
          </>
        );
      },
    },
    {
      accessor: "end_date",
      width: "20%",
      render: (data: LeaveData) => {
        const formattedDate = StringDateFormatConvertor(
          data.end_date,
          "DD/MM/YYYY"
        );
        return (
          <>
            {formattedDate} /{" "}
            {data?.end_day === "half" ? ` ${data.end_half_day_time}` : " full"}
          </>
        );
      },
    },
    {
      accessor: "status",
      width: "10%",
    },
    {
      accessor: "Action",
      width: "8%",
      render: (data: LeaveData) => {
        const editModal = (row: LeaveData) => {
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
      <div className="flex justify-between p-2 max-sm:flex-col-reverse h-[90px]">
        <div>Total Leaves ({totalleaves})</div>
        <div className="flex flex-grow gap-2 justify-end items-center w-[32%]  max-sm:w-full">
          <Searchbar
            value={search}
            handleSearch={handleSearchChange}
            placeholder="Search"
            iconcolor="#9ca3af"
          />
          <CustomModal
            opened={opened}
            onClose={close}
            open={open}
            size="lg"
            close={close}
            buttonlabel="Add Leave"
            modalTitle="Apply for Leave"
            content={
              <LeaveForm
                onClose={close}
                triggerCreate={createLeave}
                token={authToken}
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
          size="lg"
          close={editclose}
          showButton={false}
          modalTitle="You Want to Approve the leave"
          bgcolor="transparent"
          content={
            <div className="flex gap-3 flex-col">
              <h3>Please approve or reject the leave</h3>
              <Group justify="flex-end">
                <Button
                  variant="filled"
                  color="red"
                  onClick={() => {
                    handleUpdate(userData!, "rejected");
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
                    handleUpdate(userData!, "approved");
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
