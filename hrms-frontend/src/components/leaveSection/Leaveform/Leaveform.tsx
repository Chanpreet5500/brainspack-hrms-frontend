"use client";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import SelectInputField from "../../Inputs/selectInput/Select";
import { Button, Group, Textarea, useCombobox } from "@mantine/core";
import { DatePickerComponent } from "../../reusableComponents/CustomDatePicker/CustomDatePicker";
import { leaveTypes } from "@/constants/constants";
import {
  useCreateLeaveMutation,
  useLazyGetAllLeaveDataApiByNameQuery,
} from "@/services/leave/getLeaves";
import { DateFormatConvertor } from "@/constants/commonFunction";
import SelectSearch from "@/components/reusableComponents/SearchSelect";
import { setallLeaves } from "@/redux/leave/leaves";
import { useDispatch } from "react-redux";

interface dataValue {
  onClose: any;
  triggerCreate: any;
}
const LeaveForm: React.FC<dataValue> = ({ onClose, triggerCreate }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  // const [createLeave, { isLoading, error }] = useCreateLeaveMutation();
  const [search, setSearch] = useState("");
  const [allLeaveData, { data: leaveData, isSuccess: isSuccessToGetAllData }] =
    useLazyGetAllLeaveDataApiByNameQuery();
  const dispatch = useDispatch();

  const handleSubmit = async (data: any) => {
    try {
      const { employee, ...rest } = data;
      console.log(data, "mydata");

      const response = await triggerCreate({
        createdById: "66f2d6a2a957ff778f4384fb",
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
      allLeaveData("params");
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
    },
    validate: {
      employee: (value) => (value ? null : "Please select an employee."),
      // leave_type: (value) =>
      //   value ? null : "Please select the type of leave.",
      start_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the start date.",
      end_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the end date.",
    },
  });
  let data = form.getValues();
  let formateddate = DateFormatConvertor(data.start_date);
  const employeeData = [
    { id: "1", label: "Admin", value: "admin" },
    { id: "2", label: "HR", value: "hr" },
    { id: "3", label: "Employee", value: "employee" },
  ];
  return (
    <form
      onSubmit={form.onSubmit((localUserDetails: any) => {
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
          name={"leave_type"}
          placeholder={"Select the leave type"}
          data={leaveTypes}
          validateKey={form.getInputProps("leave_type")}
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
          <DatePickerComponent
            datePickerLabel={"End Date"}
            value={endDate}
            defaultvalue={endDate}
            onChange={(date: any) => {
              if (date) {
                if (startDate && date <= startDate) {
                  return;
                }
                setEndDate(date);
              }
              form.setFieldValue("end_date", date);
            }}
            minDate={startDate}
          />
        </div>
        <Textarea
          label="Reason"
          resize="vertical"
          placeholder="Leave Reason*"
        />

        <Group justify="space-between">
          <Button type="submit">Submit</Button>
          <Button onClick={onClose}>Cancel</Button>
        </Group>
      </div>
    </form>
  );
};
export default LeaveForm;
