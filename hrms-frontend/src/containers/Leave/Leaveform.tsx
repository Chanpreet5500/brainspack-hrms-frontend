"use client";
import { useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { Button, Group, MantineProvider, Textarea, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { holidayData, whichHalfData } from "@/constants/constants";
import { DateFormatConvertor } from "@/utils/commonFunction";

import SelectSearch from "@/components/reusableComponents/SearchSelect";
import { useLazyGetAllDataApiByNameQuery } from "@/services/user/usersApi";
import { useLazyGetAllLeaveTypePoliciesApiByNameQuery } from "@/services/typePolicies/typeApi";
import { DatePickerComponent } from "@/components/reusableComponents/CustomDatePicker/CustomDatePicker";
import SelectInputField from "@/components/Inputs/selectInput/Select";
import { leaveValidationSchema } from "./leaveValidationSchema";

interface dataValue {
  onClose: any;
  triggerCreate: any;
  token: any;
  createSuccess: any;
  editBy: string;
}

const LeaveForm: React.FC<dataValue> = ({
  onClose,
  triggerCreate,
  token,
  createSuccess,
  editBy,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  const [reasonError, setReasonError] = useState<string>(""); // State to track reason error

  const [allDataApi, { data: employeData }] = useLazyGetAllDataApiByNameQuery();
  const [allleaveTypeDataApi, { data: leaveTypeData }] =
    useLazyGetAllLeaveTypePoliciesApiByNameQuery();

  useEffect(() => {
    if (token) {
      allleaveTypeDataApi({ token: token });
      allDataApi({ token: token });
    }
  }, [token]);

  const leaveOptions =
    leaveTypeData?.map((leave: any) => ({
      value: leave?._id,
      label: leave?.description,
    })) || [];

  const handleSubmit = async (data: any) => {
    try {
      const { employee, reason, ...rest } = data; // Get reason from form data

      // Check if reason is empty and set error if so
      if (!reason || reason.trim() === "") {
        setReasonError("Please provide a reason for the leave.");
        return;
      }

      setReasonError(""); // Reset error if reason is valid

      let adjustedEndDate = endDate;
      let adjustedEndDay = data?.end_day;
      if (
        data.start_day === "second half" &&
        endDate?.getTime() === startDate?.getTime()
      ) {
        adjustedEndDate = new Date(startDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        adjustedEndDay = "full";
      }

      const myleavedata = {
        ...rest,
        employee_id: data?.employee,
        leave_type_id: data?.leave_type_id,
        start_date: DateFormatConvertor(startDate),
        start_day: data?.start_day,
        end_date: DateFormatConvertor(adjustedEndDate),
        end_day: adjustedEndDay,
      };

      const response = await triggerCreate({
        createdById: editBy,
        leavedata: myleavedata,
        token: token,
      });

      notifications.show({
        title: "Leave Successful",
        message: "Leave data created successfully",
        color: "green",
        icon: <IconCheck size={18} />,
        autoClose: 1000,
      });

      onClose();
      form.reset();
    } catch (err) {
      console.error("Error creating leave:", err);
    }
  };

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      employee: "",
      leave_type: "",
      start_date: startDate,
      end_date: endDate,
      start_day: "",
      start_half_day_time: "",
      end_day: "",
      end_half_day_time: "",
      reason: "", // Add reason to the form state
    },
    validate: yupResolver(leaveValidationSchema),
  });

  useEffect(() => {
    if (startDate && (!endDate || endDate < startDate)) {
      setEndDate(startDate);
      form.setFieldValue("end_date", startDate);
    }
  }, [startDate]);

  useEffect(() => {
    form.setFieldValue("end_day", form.values.start_day);
    form.setFieldValue("end_half_day_time", form.values.start_half_day_time);
  }, [form.values.start_day, form.values.start_half_day_time]);

  const employeeOptions =
    employeData?.users?.map((user: any) => ({
      value: user._id,
      label: user.fname + " " + user.lname,
    })) || [];

  return (
    <form
      onSubmit={form.onSubmit((localUserDetails: any) => {
        handleSubmit(localUserDetails);
      })}
    >
      <div className="flex flex-col m-auto gap-3">
        <SelectSearch
          label={"Employee"}
          form={form}
          name={"employee"}
          placeholder={"Select the employee name"}
          data={employeeOptions}
          validateKey={form.getInputProps("employee")}
        />
        <SelectInputField
          label={"Leave Type"}
          form={form}
          name={"leave_type_id"}
          placeholder={"Select the leave type"}
          data={leaveOptions}
          validateKey={form.getInputProps("leave_type_id")}
        />
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
            disabled={form.values.start_day === "half" ? false : true}
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
            disabled={
              form.values.end_day === "half" && endDate !== startDate
                ? false
                : true
            }
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
          error={reasonError ? reasonError : undefined}
          {...form.getInputProps("reason")}
        />
        <MantineProvider>
          <Group className="!flex !justify-end !w-full">
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
