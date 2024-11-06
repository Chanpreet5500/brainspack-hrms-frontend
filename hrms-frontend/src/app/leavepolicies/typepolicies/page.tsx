"use client";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar/Searchbar";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useCreateTypePoliciesApiMutation,
  useLazyGetAllLeaveTypePoliciesApiByNameQuery,
  useUpdateLeaveTypeApiByNameMutation,
} from "@/services/typePolicies/typeApi";
import {
  setallTypesPolicies,
  settotalTypePolicies,
} from "@/redux/typePolicies/type";
import { manageTypePoliciesSelector } from "@/redux/typePolicies/typeSelector";
import TypeForm from "@/components/policiesSection/TypePoliciesForm";
import { CustumCard } from "@/components/policiesSection/Card";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";

const initialState = {
  allTypesPolicies: [],
  totalTypePolicies: 0,
};

export default function TypePolicies() {
  const [
    createTypePolicies,
    { data, isLoading, error, isSuccess: createSuccess },
  ] = useCreateTypePoliciesApiMutation();
  const [updateTypePolicies, { data: updateData }] =
    useUpdateLeaveTypeApiByNameMutation();
  const [
    triggerLeaveTypePolicies,
    { data: leaveTypeData, isSuccess, isError },
  ] = useLazyGetAllLeaveTypePoliciesApiByNameQuery();
  const { authUser, authToken } = useSelector(manageAuthUserSelector);
  const { allTypesPolicies, totalTypePolicies } = useSelector(
    manageTypePoliciesSelector
  );
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const onHandelUpdate = async (row: any) => {
    const mydata = {
      name: row.name,
      description: row.description,
    };
    try {
      const result = await updateTypePolicies({
        leaveTypeID: row.leave_policy_id,
        data: mydata,
        token: authToken,
      });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (authToken) {
      triggerLeaveTypePolicies({ token: authToken });
    }
    if (leaveTypeData) {
      dispatch(setallTypesPolicies(leaveTypeData));
      dispatch(settotalTypePolicies(leaveTypeData?.length));
    }
  }, [leaveTypeData, createSuccess, authToken, updateData]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
  };

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) => (value ? null : "Please select the leave type name."),
      description: (value) =>
        value ? null : "Please select the type of description.",
    },
  });
  return (
    <>
      <div className="flex justify-between p-2 max-sm:flex-col-reverse">
        <div>Leave Type({totalTypePolicies})</div>
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
            buttonlabel={"Add Leave Type"}
            modalTitle={"Add Leave Type"}
            content={
              <TypeForm
                form={form}
                onClose={close}
                triggerCreate={createTypePolicies}
                triggerUpdate={onHandelUpdate}
              />
            }
          />
        </div>
      </div>
      <div className="flex flex-wrap  align-middle gap-8">
        <CustumCard
          module={"leaveType"}
          form={form}
          open={open}
          allPolicies={allTypesPolicies}
        />
      </div>
    </>
  );
}
