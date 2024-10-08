"use client";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar/Searchbar";
import { tableDataLimit, TableHeadiingForLeaves } from "@/constants/constants";
import CustomTable from "@/components/reusableComponents/CustomTable/CustomTable";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import CustomPagination from "@/components/reusableComponents/CustomPagination/CustomPagination";
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
import { useLazyGetAllLeaveDataApiByNameQuery } from "@/services/leave/getLeaves";

export default function LeaveComponent() {
  const [currentpage, setCurrentPage] = useState(1);
  const [trigger] = useLazyGetAllLeaveDataApiByNameQuery();
  const { allLeaves, totalleaves } = useSelector(manageLeaveSelector);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [editopened, { open: editopen, close: editclose }] =
    useDisclosure(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    renderData(page, tableDataLimit, search);
  };
  console.log(allLeaves, totalleaves, "allLeaves");
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
    console.log(response.data.leaves, "response");
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
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    renderData(currentpage, tableDataLimit, search);
  };

  const ActionContent = (row: any) => {
    const onApprove = () => {
      console.log("Leave is Approved");
    };
    const onReject = () => {
      console.log("Leave is Rejected");
    };
    return (
      <div>
        <CustomModal
          opened={editopened}
          open={editopen}
          close={editclose}
          buttonlabel={
            <>
              <IconEdit />
            </>
          }
          modalTitle={"You Want to Approve the leave"}
          bgcolor={"red"}
          content={
            <div className="flex gap-3 flex-col">
              <h3>Please approve or reject the leave</h3>
              <Group justify="flex-end">
                <Button
                  variant="filled"
                  color="red"
                  onClick={() => {
                    onReject();
                    editclose();
                  }}
                >
                  Reject
                </Button>
                <Button
                  variant="filled"
                  color="green"
                  onClick={() => {
                    onApprove();

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
  };
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
      <CustomTable
        data={allLeaves}
        headingdata={TableHeadiingForLeaves}
        showConfirmRejectButton={true}
        showDotIcon={false}
        ActionContent={ActionContent}
      />
      <div className="flex justify-end">
        <CustomPagination
          handlePageChange={handlePageChange}
          page={currentpage}
          total={totalleaves}
          limit={tableDataLimit}
        />
      </div>
    </>
  );
}
