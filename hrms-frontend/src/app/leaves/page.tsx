"use client";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar/Searchbar";
import { TableHeadiingForLeaves } from "@/constants/constants";
import CustomTable from "@/components/CustomTable/CustomTable";
import { CustomModal } from "@/components/CustomModal/CustomModal";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import { useGetAllLeaveDataApiByNameQuery } from "@/services/user/allApis/getLeaves";
import { manageLeaveSelector } from "@/services/user/slices/allLeaves/leaveSelector";
import { useDispatch, useSelector } from "react-redux";
import { setallLeaves, settotalleaves } from "@/services/user/slices/allLeaves/leaves";
import LeaveForm from "@/components/leaveSection/Leaveform/Leaveform";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { Button, Group } from "@mantine/core";


export default function LeaveComponent() {
  const [currentpage, setCurrentPage] = useState(1)
  const { data, error, isLoading } = useGetAllLeaveDataApiByNameQuery({ page: currentpage, limit: 5 });
  const { allLeaves, totalleaves } = useSelector(manageLeaveSelector)
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [editopened, { open: editopen, close: editclose }] = useDisclosure(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (data) {
      dispatch(setallLeaves(data.leaves));
      dispatch(settotalleaves(data.totalleaves))
    }
  }, [data, dispatch])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const ActionContent = (row: any) => {
    const onApprove = () => {
      console.log('Leave is Approved')
    }
    const onReject = () => {
      console.log('Leave is Approved')
    }
    return (
      <div>
        <CustomModal
          opened={editopened}
          onClose={editclose}
          open={editopen}
          close={editclose}
          buttonlabel={<><IconEdit /></>}
          modalTitle={"You Want to Approve the leave"}
          bgcolor={"red"}
          content={
            <div className="flex gap-3 flex-col">
              <h3>Please approve or reject the leave</h3>
              <Group justify="flex-end">
                <Button variant="filled" color="red" onClick={() => { onApprove(); editclose(); }}>Reject</Button>
                <Button variant="filled" color="green" onClick={() => { onReject(); editclose(); }}>Approve</Button>
              </Group>
            </div >
          }
        />
      </div >

    )
  }
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
            content={
              <LeaveForm
                onClose={close}
              />
            }
          />
          <Searchbar
            value={search}
            handleSearch={handleSearchChange}
            placeholder="Search"
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
        <CustomPagination handlePageChange={handlePageChange} page={currentpage} total={totalleaves} limit={5} />
      </div>
    </>
  );
}
