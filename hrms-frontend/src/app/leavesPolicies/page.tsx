"use client";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar/Searchbar";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { manageLeavePoliciesSelector } from "@/redux/leavePolicies/leaveSelector";
import {
  useCreateLeavePoliciesApiMutation,
  useLazyGetAllLeavePoliciesApiApiByNameQuery,
  useUpdateLeavePoliciesTypeApiApiByNameMutation,
} from "@/services/leavePolicies/leavesApi";
import LeaveForm from "@/components/policiesSection/LeavePoliciesForm";
import {
  setallLeavesPolicies,
  settotalleavesPolicies,
} from "@/redux/leavePolicies/leave";
import { CustumCard } from "@/components/policiesSection/Card";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const initialState = {
  allLeavesPolicies: [],
  totalleavesPolicies: 0,
};

export default function TypeComponent() {
  const [createLeavePolicies, { isLoading, error, isSuccess: createSuccess }] =
    useCreateLeavePoliciesApiMutation();
  const [updateData, { data: updateLeaveData, isSuccess: updateSuccess }] =
    useUpdateLeavePoliciesTypeApiApiByNameMutation();
  const { allLeavesPolicies, totalleavesPolicies } = useSelector(
    manageLeavePoliciesSelector
  );
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [triggerLeavePolicies, { data, isSuccess, isError }] =
    useLazyGetAllLeavePoliciesApiApiByNameQuery();

  useEffect(() => {
    triggerLeavePolicies("ss");
    if (data) {
      dispatch(setallLeavesPolicies(data));
      dispatch(settotalleavesPolicies(data?.length));
    }
  }, [data, createSuccess, updateSuccess]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
  };
  const onHandelUpdate = async (leavePolicies: any) => {
    try {
      const { leave_type_id, max_leaves_per_year } = leavePolicies;
      const leaveTypeIdString = String(leave_type_id._id);
      if (true) {
        // notifications.show({
        //   title: "Error",
        //   message: "Invalid leave type ID. Please select a valid leave type.",
        //   color: "red",
        // });
        // return;
      }
      if (isNaN(Number(max_leaves_per_year))) {
        notifications.show({
          title: "Error",
          message: "Max leaves per year should be a valid number.",
          color: "red",
        });
        return;
      }
      const payload = {
        leave_type_id: leave_type_id,
        max_leaves_per_year: Number(max_leaves_per_year),
      };
      const result = await updateData({
        leave_type_id: leave_type_id,
        data: payload,
      });

      if (result.error) {
        notifications.show({
          title: "Error",
          message: "Failed to update leave policy.",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Success",
          message: "Leave policy updated successfully.",
          color: "green",
        });
        close();
      }
    } catch (error) {
      console.error("Error updating leave policy:", error);
      notifications.show({
        title: "Error",
        message: "An unexpected error occurred while updating leave policy.",
        color: "red",
      });
    }
  };

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      leave_type_id: "",
      max_leaves_per_year: "",
    },
    validate: {
      leave_type_id: (value) =>
        value ? null : "Please select the type of leave.",
      max_leaves_per_year: (value) => {
        const parsed = Number(value);
        return value && !isNaN(parsed)
          ? null
          : "Please enter a valid number for max leaves per year.";
      },
    },
  });
  return (
    <>
      <div className="flex justify-between p-2 max-sm:flex-col-reverse">
        <div>My Team ({totalleavesPolicies})</div>
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
            size={"md"}
            close={close}
            buttonlabel={"Add Leave Policies"}
            modalTitle={"Add Leave Policies"}
            content={
              <LeaveForm
                onHandelUpdate={onHandelUpdate}
                form={form}
                onClose={close}
                triggerCreate={createLeavePolicies}
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap  align-middle gap-8">
        <CustumCard
          form={form}
          open={open}
          allLeavesPolicies={allLeavesPolicies}
        />
      </div>
    </>
  );
}
