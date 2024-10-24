"use client";
import { useEffect } from "react";
import { Button, Group, MantineProvider } from "@mantine/core";
import { variantColorResolver } from "@/constants/commonFunction";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import TextInputField from "../Inputs/textInput/Input";
import DynamicSelectBox from "../Inputs/selectInput/comonSelect";
import { useLazyGetAllLeavePoliciesTypeApiApiByNameQuery } from "@/services/leavePolicies/leavesApi";
interface dataValue {
  onClose: any;
  triggerCreate: any;
  onHandelUpdate: any;
  form: any;
}
const LeaveForm: React.FC<dataValue> = ({
  onClose,
  triggerCreate,
  onHandelUpdate,
  form,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    allleaveTypeDataApi("v");
  }, []);
  const [
    allleaveTypeDataApi,
    { data: leaveTypeData, error, isLoading, isSuccess },
  ] = useLazyGetAllLeavePoliciesTypeApiApiByNameQuery();
  const getTypedata = async () => {
    const response = await allleaveTypeDataApi("v");
  };
  const handleSubmit = async (data: any) => {
    try {
      if (data?._id) {
        onHandelUpdate(data);
      } else {
        const formattedData = {
          ...data,
          max_leaves_per_year: Number(data.max_leaves_per_year),
        };
        await triggerCreate(formattedData);
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

  let data = form.getValues();
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
              onClick={onClose}
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
export default LeaveForm;
