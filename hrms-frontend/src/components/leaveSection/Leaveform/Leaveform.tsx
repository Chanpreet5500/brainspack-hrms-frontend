"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import SelectInputField from "../../Inputs/selectInput/Select";
import {
  Button,
  Group,
  MantineProvider,
  Textarea,
  useCombobox,
} from "@mantine/core";
import { DatePickerComponent } from "../../reusableComponents/CustomDatePicker/CustomDatePicker";
import {
  employeeData,
  holidayData,
  leaveTypes,
  whichHalfData,
} from "@/constants/constants";
import { useLazyGetAllLeaveDataApiByNameQuery } from "@/services/leave/getLeaves";
import {
  DateFormatConvertor,
  variantColorResolver,
} from "@/constants/commonFunction";
import SelectSearch from "@/components/reusableComponents/SearchSelect";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
interface dataValue {
  onClose: any;
  triggerCreate: any;
}
const LeaveForm: React.FC<dataValue> = ({ onClose, triggerCreate }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  const [search, setSearch] = useState("");
  const [allLeaveData, { data: leaveData, isSuccess: isSuccessToGetAllData }] =
    useLazyGetAllLeaveDataApiByNameQuery();
  const dispatch = useDispatch();
  const handleSubmit = async (data: any) => {
    try {
      const { employee, ...rest } = data;

      const response = await triggerCreate({
        createdById: "670f65977a0a5180c8198e45",
        leavedata: {
          ...rest,
          employee_id: "66f2d6a2a957ff778f4384fb",
          leave_type_id: "67054b53377f1b9f0e64bd25",
          start_date: DateFormatConvertor(startDate),
          end_date: DateFormatConvertor(endDate),
          start_day: 'full',
          end_day: 'full'
        },
      });
      notifications.show({
        title: "Leave Successful",
        message: "Leave data Created successfully",
        color: "green",
        icon: <IconCheck size={18} />,
        autoClose: 1000,
      });
      allLeaveData(response);
      onClose();
      form.reset();
    } catch (err) {
      console.error("Error creating leave:", err);
    }
  };
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      employee: "",
      // leave_type: "",
      start_date: startDate,
      end_date: endDate,
      start_day: "",
      start_half_day_time: "",
      end_day: "",
      end_half_day_time: "",
    },
    validate: {
      employee: (value) => (value ? null : "Please select an employee."),
      // leave_type_id: (value) =>
      //   value ? null : "Please select the type of leave.",
      start_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the start date.",
      end_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the end date.",
    },
  });
  let data = form.getValues();
  console.log(data, "DATA");
  let formateddate = DateFormatConvertor(data.start_date);
  return (
    <form
      onSubmit={form.onSubmit((localUserDetails: any) => {
        console.log(localUserDetails, "localUserDetails");
        handleSubmit(localUserDetails);
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <SelectSearch
          label={"Employee"}
          form={form}
          name={"employee"}
          placeholder={"Select the employee name"}
          data={employeeData}
          validateKey={form.getInputProps("employee")}
        />
        {/* <SelectInputField
          label={"Leave Type"}
          form={form}
          name={"leave_type_id"}
          placeholder={"Select the leave type"}
          data={leaveTypes}
          validateKey={form.getInputProps("leave_type")}
        /> */}
        {/* validateKey={form.getInputProps("leave_type_id")}
        /> */}
        <div className="flex gap-4">
          <DatePickerComponent
            datePickerLabel={"Start Date"}
            value={startDate}
            defaultvalue={startDate}
            onChange={(date: any) => {
              if (date) {
                setStartDate(date);

                if (endDate && endDate <= date) {
                  setEndDate(date);
                  form.setFieldValue("end_date", date);
                }
              }
              form.setFieldValue("start_date", date);
            }}
            minDate={startDate == new Date() ? startDate : ""}
          />
          <SelectInputField
            label={"Start Day"}
            form={form}
            name={"start_day"}
            placeholder={"Half"}
            data={holidayData}
            validateKey={form.getInputProps("start_day")}
          />
          <SelectInputField
            disabled={data?.start_day === "half" ? false : true}
            label={"For ? Half"}
            form={form}
            name={"start_half_day_time"}
            placeholder={"Half"}
            data={whichHalfData}
            validateKey={form.getInputProps("start_half_day_time")}
          />
        </div>
        <div className="flex gap-4">
          <DatePickerComponent
            datePickerLabel={"End Date"}
            value={endDate}
            defaultvalue={endDate}
            onChange={(date: any) => {
              if (date) {
                setEndDate(date);
              }
              form.setFieldValue("end_date", date);
            }}
            minDate={startDate}
          />
          <SelectInputField
            disabled={
              startDate?.getTime() !== endDate?.getTime() ? false : true
            }
            label={"Last Day"}
            form={form}
            name={"end_day"}
            placeholder={"Half"}
            data={holidayData}
            validateKey={form.getInputProps("end_day")}
          />
          <SelectInputField
            disabled={data?.end_day === "half" ? false : true}
            label={"For ? Half"}
            form={form}
            name={"end_half_day_time"}
            placeholder={"Half"}
            data={whichHalfData}
            validateKey={form.getInputProps("end_half_day_time")}
          />
        </div>
        <Textarea
          label="Reason"
          resize="vertical"
          placeholder="Leave Reason*"
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
