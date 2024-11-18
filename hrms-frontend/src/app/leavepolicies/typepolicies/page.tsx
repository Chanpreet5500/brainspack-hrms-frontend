"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageTypePoliciesSelector } from "@/redux/typePolicies/typeSelector";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import Searchbar from "@/components/Searchbar/Searchbar";
import { CustomModal } from "@/components/reusableComponents/CustomModal/CustomModal";
import { useDisclosure } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import {
  useCreateTypePoliciesApiMutation,
  useLazyGetAllLeaveTypePoliciesApiByNameQuery,
  useUpdateLeaveTypeApiByNameMutation,
} from "@/services/typePolicies/typeApi";
import {
  setallTypesPolicies,
  settotalTypePolicies,
} from "@/redux/typePolicies/type";
import TypeForm from "@/components/policiesSection/TypePoliciesForm";
import { CustumCard } from "@/components/policiesSection/Card";
import { leavePolicySchema } from "./typePoliciesSchema";

interface LeaveTypePolicy {
  _id: string;
  name: string;
  description: string;
}

interface TypePolicyApiResponse {
  data: LeaveTypePolicy[];
  total: number;
}

const initialState = {
  allTypesPolicies: [] as LeaveTypePolicy[],
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
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);

  const onHandelUpdate = async (row: LeaveTypePolicy) => {
    const mydata = {
      name: row.name,
      description: row.description,
    };

    try {
      const result = await updateTypePolicies({
        leaveTypeID: row._id,
        data: mydata,
        token: authToken!,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      triggerLeaveTypePolicies({ token: authToken });
    }

    if (leaveTypeData) {
      dispatch(setallTypesPolicies(leaveTypeData));
      dispatch(settotalTypePolicies(leaveTypeData.length));
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
    validate: yupResolver(leavePolicySchema),
  });

  return (
    <>
      <div className="flex h-[90px] justify-between p-2 max-sm:flex-col-reverse">
        <div className="flex items-center">Leave Type({totalTypePolicies})</div>
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
                token={authToken!}
                createSuccess={createSuccess}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap align-middle gap-8 justify-center">
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
