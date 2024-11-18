"use client";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar/Searchbar";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { manageLeavePoliciesSelector } from "@/redux/leavePolicies/leaveSelector";
import {
  useLazyGetAllLeavePoliciesApiApiByNameQuery,
  useUpdateLeavePoliciesApiByNameMutation,
} from "@/services/leavePolicies/leavesApi";
import LeavePolicieForm from "@/components/policiesSection/LeavePoliciesForm";
import {
  resetIsCall,
  setallLeavesPolicies,
  settotalleavesPolicies,
} from "@/redux/leavePolicies/leave";
import { CustumCard } from "@/components/policiesSection/Card";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { numberOfLeavesSchema } from "./leavesSchema";
export interface LeavePolicy {
  _id: string;
  leave_type_id: string;
  max_leaves_per_year: number;
}
interface LeavePoliciesResponse {
  data: LeavePolicy[];
  totalLeaves: number;
}
const initialState = {
  allLeavesPolicies: [] as LeavePolicy[],
  totalleavesPolicies: 0,
};
export interface FormValuesLeavesPolicy {
  leave_type_id: string;
  max_leaves_per_year: string;
}
export default function TypeComponent() {
  const [updateData, { data: updateLeaveData, isSuccess: updateSuccess }] =
    useUpdateLeavePoliciesApiByNameMutation();
  const { allLeavesPolicies, totalleavesPolicies, isCall } = useSelector(
    manageLeavePoliciesSelector
  );
  const { authUser, authToken } = useSelector(manageAuthUserSelector);
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [triggerLeavePolicies, { data, isSuccess, isError }] =
    useLazyGetAllLeavePoliciesApiApiByNameQuery();
  useEffect(() => {
    if (authToken) {
      triggerLeavePolicies({ token: authToken });
    }
    if (data) {
      dispatch(setallLeavesPolicies(data));
      dispatch(settotalleavesPolicies(data.length));
      dispatch(resetIsCall(false));
    }
  }, [data, isCall, updateSuccess, authToken]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
  };
  const onHandelUpdate: (leavePolicies: LeavePolicy) => Promise<void> = async (
    leavePolicies
  ) => {
    try {
      const { leave_type_id, max_leaves_per_year, _id } = leavePolicies;
      if (isNaN(Number(max_leaves_per_year))) {
        notifications.show({
          title: "Error",
          message: "Max leaves per year should be a valid number.",
          color: "red",
        });
        return;
      }
      const payload = {
        leave_policy_id: _id,
        max_leaves_per_year: Number(max_leaves_per_year),
      };
      const result = await updateData({
        data: payload,
        token: authToken,
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
    close();
    form.reset();
  };
  const form = useForm<FormValuesLeavesPolicy>({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      leave_type_id: "",
      max_leaves_per_year: "",
    },

    validate: yupResolver(numberOfLeavesSchema),
  });
  return (
    <>
      <div className="flex h-[90px] justify-between p-2 max-sm:flex-col-reverse ">
        <div className="flex items-center">
          Leave Policies ({totalleavesPolicies})
        </div>
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
              <LeavePolicieForm
                onHandelUpdate={onHandelUpdate}
                form={form}
                onClose={close}
                token={authToken}
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center align-middle gap-8">
        <CustumCard
          module={"leavePolicies"}
          form={form}
          open={open}
          allPolicies={allLeavesPolicies}
        />
      </div>
    </>
  );
}
