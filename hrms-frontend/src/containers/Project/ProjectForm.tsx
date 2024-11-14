"use client";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, MantineProvider, Textarea } from "@mantine/core";
import {
  DateFormatConvertor,
  variantColorResolver,
} from "@/utils/commonFunction";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useLazyGetAllDataApiByNameQuery } from "@/services/user/usersApi";
import { DatePickerComponent } from "@/components/reusableComponents/CustomDatePicker/CustomDatePicker";
import TextInputField from "@/components/Inputs/textInput/Input";
import TextAreaField from "@/components/Inputs/textArea/TextArea";
import SelectSearch from "@/components/reusableComponents/MultiSearchSelect";
import MultiSearchSelect from "@/components/reusableComponents/MultiSearchSelect";

interface AuthUser {
  userId: string;
}

interface dataValue {
  onClose: any;
  triggerCreate: any;
  triggerUpdate: any;
  token: any;
  startDate: any;
  endDate: any;
  setEndDate: any;
  setStartDate: any;
  authUser: AuthUser;
  form: any;
  createSuccess: boolean;
  // editBy: string;
}

const ProjectForm: React.FC<dataValue> = ({
  onClose,
  triggerUpdate,
  triggerCreate,
  token,
  startDate,
  setEndDate,
  setStartDate,
  endDate,
  authUser,
  form,
  createSuccess,
}) => {
  const [allDataApi, { data: employeData }] = useLazyGetAllDataApiByNameQuery();
  useEffect(() => {
    if (token) {
      allDataApi({ token: token });
    }
  }, [token, createSuccess]);

  const handleSubmit = async (data: any) => {
    try {
      let adjustedEndDate = endDate;
      if (endDate?.getTime() === startDate?.getTime()) {
        adjustedEndDate = new Date(startDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
      }
      const projectdata = {
        name: data?.name,
        assigned_to: data?.assigned_to,
        description: data?.description,
        assigned_by: authUser?.userId,
        start_date: DateFormatConvertor(startDate),
        end_date: DateFormatConvertor(adjustedEndDate),
      };
      if (data._id) {
        triggerUpdate(data);
        notifications.show({
          title: "Update Successful",
          message: "Employee data updated successfully",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 1000,
        });
      } else {
        const response = await triggerCreate({
          data: projectdata,
          token: token,
        });
        notifications.show({
          title: "Project Add Successful",
          message: "Project data created successfully",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 1000,
        });
      }
      onClose();
      form.reset();
    } catch (err) {
      console.error("Error creating leave:", err);
    }
  };

  useEffect(() => {
    if (startDate && (!endDate || endDate < startDate)) {
      setEndDate(startDate);
      form.setFieldValue("end_date", startDate);
    }
  }, [startDate]);

  return (
    <form
      onSubmit={form.onSubmit((localProjectDetails: any) => {
        handleSubmit(localProjectDetails);
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <TextInputField
          withAsterisk={true}
          name={"name"}
          label={"Project Name"}
          placeholder={"Enter your project name"}
          validateKey={form.getInputProps("name")}
        />
        <MultiSearchSelect
          label={"Assigned To"}
          form={form}
          name={"assigned_to"}
          data={employeData}
          placeholder={"Select the employee's name"}
          validateKey={form.getInputProps("assigned_to")}
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
        </div>
        <TextAreaField
          withAsterisk={true}
          label="Description"
          name={"description"}
          resize="vertical"
          placeholder="Leave Description*"
          validateKey={form.getInputProps("description")}
        />
        <MantineProvider theme={{ variantColorResolver }}>
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

export default ProjectForm;
