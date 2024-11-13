import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trackChange } from "@/redux/holiday/holiday";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { Button, Group, MantineProvider } from "@mantine/core";
import { holidayType } from "@/constants/constants";
import SelectInputField from "../../components/Inputs/selectInput/Select";
import TextInputField from "../../components/Inputs/textInput/Input";
import {
  useCreateHolidayMutation,
  useDeleteHolidayDataApiByNameMutation,
  useUpdateHolidayDataApiByNameMutation,
} from "@/services/holiday/holidayApi";
import { DateFormatConvertor } from "@/utils/commonFunction";
import {
  HolidayFormData,
  HolidayFormProps,
} from "@/utils/interfaces/interfaces";

const HolidayForm: React.FC<HolidayFormProps> = ({ form, modalClose }) => {
  const [updateHolidayData, { isSuccess: updateSuccess }] =
    useUpdateHolidayDataApiByNameMutation();
  const [deleteHolidayData, { isSuccess: deleteSuccess }] =
    useDeleteHolidayDataApiByNameMutation();
  const [postData, { isSuccess: createSuccess }] = useCreateHolidayMutation();
  const { authToken, authUser } = useSelector(manageAuthUserSelector);
  const dispatch = useDispatch();
  const handleSubmit = async (data: HolidayFormData) => {
    const formattedDate = DateFormatConvertor(data.date);
    data.date = formattedDate;
    if (data?.holiday_id) {
      await updateHolidayData({
        data: data,
        owner_id: authUser?.userId,
        token: authToken,
      });
    } else {
      await postData({
        data: data,
        owner_id: authUser?.userId,
        token: authToken,
      });
    }
    modalClose();
    form?.reset();
  };
  const onRemove = async (holidayId: string) => {
    await deleteHolidayData({ data: holidayId, token: authToken });
    modalClose();
  };
  useEffect(() => {
    dispatch(trackChange(true));
  }, [updateSuccess, deleteSuccess, createSuccess]);
  return (
    <form
      onSubmit={form.onSubmit((localUserDetails) => {
        handleSubmit(localUserDetails as HolidayFormData);
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <TextInputField
          withAsterisk={true}
          name={"title"}
          label={"Holiday Title"}
          placeholder={"Enter the holiday title"}
          validateKey={form.getInputProps("title")}
        />
        <TextInputField
          withAsterisk
          name={"description"}
          label={"Holiday Description"}
          placeholder={"Enter the holiday description"}
          validateKey={form.getInputProps("description")}
        />
        <SelectInputField
          label={"Type"}
          form={form}
          name={"type"}
          placeholder={"Select Holiday Type"}
          data={holidayType}
          validateKey={form.getInputProps("type")}
        />
        {!form.getInputProps("holiday_id").value ? (
          <MantineProvider>
            <Group className=" !flex !justify-end !w-full ">
              <Button
                variant="default"
                className="!h-[32px] !w-[90px] !font-[500]"
                radius="md"
                onClick={() => modalClose()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="filled"
                className=" custom-button  !h-[32px] !w-[90px] !font-[500]"
                radius="md"
              >
                Add
              </Button>
            </Group>
          </MantineProvider>
        ) : (
          <MantineProvider>
            <Group className=" !flex !justify-end !w-full ">
              <Button
                variant="filled"
                className="!h-[32px] !w-[90px] !font-[500]"
                radius="md"
                onClick={() => onRemove(form.getInputProps("holiday_id").value)}
                color="red"
              >
                Delete
              </Button>
              <Button
                type="submit"
                variant="filled"
                className=" custom-button !h-[32px] !w-[90px] !font-[500]"
                radius="md"
              >
                Update
              </Button>
            </Group>
          </MantineProvider>
        )}
      </div>
    </form>
  );
};
export default HolidayForm;
