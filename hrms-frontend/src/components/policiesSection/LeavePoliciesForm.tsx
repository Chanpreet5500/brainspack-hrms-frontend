"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Group, MantineProvider } from "@mantine/core";
import { variantColorResolver } from "@/utils/commonFunction";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import TextInputField from "../Inputs/textInput/Input";
import DynamicSelectBox from "../Inputs/selectInput/comonSelect";
import { useLazyGetAllLeaveTypePoliciesApiByNameQuery } from "@/services/typePolicies/typeApi";
import { UseFormReturnType } from "@mantine/form";
import {
  FormValuesLeavesPolicy,
  LeavePolicy,
} from "@/app/leavepolicies/leavespolicies/page";
import { useCreateLeavePoliciesApiMutation } from "@/services/leavePolicies/leavesApi";
import { resetIsCall } from "@/redux/leavePolicies/leave";
interface FormValues {
  _id?: string;
  leave_type_id?: string;
  max_leaves_per_year?: string | number;
  [key: string]: any;
}
interface DataValue {
  onClose: () => void;
  onHandelUpdate: (leavePolicies: LeavePolicy) => Promise<void>;
  form: UseFormReturnType<FormValuesLeavesPolicy>;
  token: string;
}
const LeavePolicieForm: React.FC<DataValue> = ({
  onClose,
  onHandelUpdate,
  form,
  token,
}) => {
  const [
    createLeavePolicies,
    {
      isLoading: create_isLoading,
      error: create_error,
      isSuccess: createSuccess,
    },
  ] = useCreateLeavePoliciesApiMutation();
  const dispatch = useDispatch();
  let data = form.getValues();
  useEffect(() => {
    if (token) {
      allleaveTypeDataApi({ token: token });
    }
  }, [token]);
  useEffect(() => {
    dispatch(resetIsCall(true));
  }, [createSuccess]);
  const [
    allleaveTypeDataApi,
    { data: leaveTypeData, error, isLoading, isSuccess },
  ] = useLazyGetAllLeaveTypePoliciesApiByNameQuery();
  const onCancel = () => {
    onClose();
    form.reset();
  };
  const handleSubmit = async (formData: any) => {
    try {
      if (formData?._id) {
        onHandelUpdate(formData);
      } else {
        const formattedData = {
          ...formData,
          max_leaves_per_year: Number(formData.max_leaves_per_year),
          token,
        };
        await createLeavePolicies(formattedData);
        {
          formattedData.leave_type_id !== formattedData.leave_type_id
            ? notifications.show({
                title: "Leave Successful",
                message: "Leave data created successfully",
                color: "green",
                icon: <IconCheck size={18} />,
                autoClose: 1000,
              })
            : "";
        }
        onClose();
        form.reset();
      }
    } catch (err) {
      console.error("Error creating leave:", err);
    }
  };
  return (
    <form
      onSubmit={form.onSubmit((values: any) => {
        handleSubmit(values);
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <DynamicSelectBox
          label={"Select an Option"}
          form={form}
          name={"leave_type_id"}
          placeholder={"Select the leaveType"}
          data={leaveTypeData}
          validateKey={form.getInputProps("leave_type_id")}
        />
        <TextInputField
          withAsterisk={true}
          label={"max leaves/year"}
          name={"max_leaves_per_year"}
          placeholder={"Select the leave max leaves / year"}
          validateKey={form.getInputProps("max_leaves_per_year")}
        />
        <MantineProvider theme={{ variantColorResolver }}>
          <Group className=" !flex !justify-end !w-full ">
            <Button
              variant="default"
              className="!h-[32px] !w-[90px] !font-[500]"
              radius="md"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="filled"
              className="!h-[32px] !w-[90px] !font-[500]"
              radius="md"
            >
              Submit
            </Button>
          </Group>
        </MantineProvider>
      </div>
    </form>
  );
};
export default LeavePolicieForm;
