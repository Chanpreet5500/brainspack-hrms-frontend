"use client";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Group,
  MantineProvider,
  Textarea,
  useCombobox,
} from "@mantine/core";
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
} from "@/utils/commonFunction";
import SelectSearch from "@/components/reusableComponents/SearchSelect";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useLazyGetAllDataApiByNameQuery } from "@/services/user/usersApi";
import { manageLeavePoliciesSelector } from "@/redux/leavePolicies/leaveSelector";
import { useLazyGetAllLeavePoliciesApiApiByNameQuery } from "@/services/leavePolicies/leavesApi";
import {
  setallLeavesPolicies,
  settotalleavesPolicies,
} from "@/redux/leavePolicies/leave";
import { useLazyGetAllLeaveTypePoliciesApiByNameQuery } from "@/services/typePolicies/typeApi";
import page from "@/app/page";
import SelectInputField from "@/components/Inputs/selectInput/Select";
import { DatePickerComponent } from "@/components/reusableComponents/CustomDatePicker/CustomDatePicker";
interface dataValue {
  onClose: any;
  triggerCreate: any;
  token: any;
  editBy: string;
}
const initialState = {
  allLeavesPolicies: [],
  totalleavesPolicies: 0,
};
const LeaveForm: React.FC<dataValue> = ({
  onClose,
  triggerCreate,
  token,
  editBy,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  const [search, setSearch] = useState("");
  const [allLeaveData, { data: leaveData, isSuccess: isSuccessToGetAllData }] =
    useLazyGetAllLeaveDataApiByNameQuery();
  const [allDataApi, { data: employeData, error, isLoading, isSuccess }] =
    useLazyGetAllDataApiByNameQuery();

  const { allLeavesPolicies, totalleavesPolicies } = useSelector(
    manageLeavePoliciesSelector
  );
  const [allleaveTypeDataApi, { data: leaveTypeData }] =
    useLazyGetAllLeaveTypePoliciesApiByNameQuery();
  useEffect(() => {
    if (token) {
      allleaveTypeDataApi({ token: token });
    }
  }, [token]);
  const leaveOptions =
    leaveTypeData?.map((leave: any) => ({
      value: leave?._id,
      label: leave?.description,
    })) || [];
  console.log(leaveTypeData, leaveOptions, "leaveTypeData");
  useEffect(() => {
    allDataApi({ search, token });
  }, [search, token]);
  const handleSubmit = async (data: any) => {
    try {
      const { employee, ...rest } = data;

      const response = await triggerCreate({
        createdById: editBy,
        leavedata: {
          ...rest,
          employee_id: data?.employee,
          leave_type_id: data?.leave_type_id,
          start_date: DateFormatConvertor(startDate),
          end_date: DateFormatConvertor(endDate),
          start_day: "full",
          end_day: "full",
        },
        token: token,
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

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      employee: "",

      start_date: startDate,
      end_date: endDate,
      start_day: "",
      start_half_day_time: "",
      end_day: "",
      end_half_day_time: "",
    },
    validate: {
      employee: (value) => (value ? null : "Please select an employee."),

      start_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the start date.",
      end_date: (value) =>
        DateFormatConvertor(value) ? null : "Please select the end date.",
    },
  });
  let data = form.getValues();
  const employeeOptions =
    employeData?.users?.map((user: any) => ({
      value: user._id,
      label: user.fname,
    })) || [];

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
