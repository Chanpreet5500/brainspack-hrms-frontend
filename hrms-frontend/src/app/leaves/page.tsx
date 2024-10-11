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
import LeaveForm from "@/components/leaveSection/Leaveform/Leaveform";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { Button, Group } from "@mantine/core";
import {
  useLazyGetAllLeaveDataApiByNameQuery,
  useUpdateLeaveDataApiByNameMutation,
} from "@/services/leave/getLeaves";
import { DataTable } from "mantine-datatable";
import { updateLeaveStatus } from "@/redux/leave/leaves";
const initialState = {
  allLeaves: [],
  totalleaves: 0,
};

export default function LeaveComponent() {
  const [currentpage, setCurrentPage] = useState(1);
  const [trigger] = useLazyGetAllLeaveDataApiByNameQuery();
  const [updateLeave] = useUpdateLeaveDataApiByNameMutation();

  const { allLeaves, totalleaves } = useSelector(manageLeaveSelector);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    renderData(page, tableDataLimit, search);
  };

  console.log(allLeaves, totalleaves, "totalleaves");
  const handleUpdate = async (data: any, status: string) => {
    try {
      const response = await updateLeave({
        leaveId: data._id,
        status,
        updatedById: "66f6a1d7d1e7250d2a3d5389",
      });

      if (response.error) {
        console.error("Failed to update leave:", response.error);
      } else {
        console.log("Leave updated successfully:", response.data);
        // dispatch(updateLeaveStatus({ id: data._id, status }));
        renderData(currentpage, tableDataLimit, search);
      }
    } catch (err) {
      console.error("Error updating leave:", err);
    }
  };
  const renderData = async (
    currpage: number,
    limit: number,
    search: string
  ) => {
    dispatch(resetLeaves());
    const response = await trigger({
      page: currpage,
      limit: limit,
      search: search,
    });
    try {
      if (response.data) {
        dispatch(setallLeaves(response.data.leaves));
        dispatch(settotalleaves(response.data.totalleaves));
      } else {
        console.error("Failed to fetch leaves.");
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    renderData(currentpage, tableDataLimit, search);
  }, [currentpage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    renderData(currentpage, tableDataLimit, search);
  };

  type TableRow = {
    id: number;
    fname: string;
    lname: string;
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
      width: "15%",
      render: (data: TableRow) => {
        return <>employee</>;
      },
    },
    { accessor: "leave_type", width: "20%" },
    { accessor: "start_date", width: "25%" },
    { accessor: "end_date", width: "25%" },
    { accessor: "status", width: "15%" },

    {
      accessor: "Action",
      width: "40%",
      render: (data: TableRow) => {
        const [editopened, { open: editopen, close: editclose }] =
          useDisclosure(false);
        return (
          <div>
            <CustomModal
              opened={editopened}
              open={editopen}
              close={editclose}
              className="!bg-transparent !hover:bg-red-600 "
              buttonlabel={
                <>
                  <IconEdit className="h-[25px] w-[25px] text-blue-600 cursor-pointer" />
                </>
              }
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
                        handleUpdate(data, "rejected");
                        editclose();
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="filled"
                      color="green"
                      onClick={() => {
                        handleUpdate(data, "approved");
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
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between p-2 max-sm:flex-col-reverse">
        <div>My Team ({totalleaves})</div>
        <div className="flex gap-1 items-center w-[32%] max-sm:w-full">
          <CustomModal
            opened={opened}
            onClose={close}
            open={open}
            close={close}
            buttonlabel={"Add Leave"}
            modalTitle={"Apply for Leave"}
            content={<LeaveForm onClose={close} />}
          />
          <Searchbar
            value={search}
            handleSearch={handleSearchChange}
            placeholder="Search "
            iconcolor="#9ca3af"
          />
        </div>
      </div>
      <DataTable
        height={300}
        withTableBorder
        striped
        highlightOnHover
        records={allLeaves}
        totalRecords={totalleaves}
        recordsPerPage={tableDataLimit}
        page={currentpage}
        onPageChange={(p) => handlePageChange(p)}
        columns={columns}
      />
    </>
  );
}
