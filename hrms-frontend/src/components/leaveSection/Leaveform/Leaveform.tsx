"use client"

import { useForm } from "@mantine/form";
import SelectInputField from "../../Inputs/selectInput/Select";
import { Button, Group, Textarea } from "@mantine/core";
import { DatePickerComponent } from "../../reusableComponents/CustomDatePicker/CustomDatePicker";
import { employeProfetion, leaveTypes } from "@/constants/constants";
import { useState } from "react";
import { useCreateLeaveMutation } from "@/services/leave/getLeaves";
import { DateFormatConvertor } from "@/constants/commonFunction";

interface value {
    onClose: any;
}

const LeaveForm: React.FC<value> = ({ onClose }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(startDate);
    const [createLeave, { isLoading, error }] = useCreateLeaveMutation();
    const handleSubmit = async (data: any) => {
        try {
            const response = await createLeave({
                createdById: "66f2d6a2a957ff778f4384fb",
                leavedata: {
                    ...data,
                    employee_id: "66f6a1d7d1e7250d2a3d5389",
                    start_date: DateFormatConvertor(startDate),
                    end_date: DateFormatConvertor(endDate),
                }
            });


            console.log("Leave created:", response);

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
        },
        validate: {
            employee: (value) => (value ? null : "Please Select the Employee."),
            leave_type: (value) => (value ? null : "Please Select the type of Leave."),
            start_date: (value) => (DateFormatConvertor(value) ? null : "Please Select the start Date."),
            end_date: (value) => (DateFormatConvertor(value) ? null : "Please Select the End Date"),
        },
    });
    let data = form.getValues();
    let formateddate = DateFormatConvertor(data.start_date);
    console.log(formateddate, "JJ")
    console.log(form.getValues(), "JJ");
    return (
        <form
            onSubmit={form.onSubmit((localUserDetails: any) => {
                console.log(localUserDetails)
                handleSubmit(localUserDetails);
            })}
        >
            <div className="flex flex-col m-auto gap-3 ">
                <SelectInputField
                    label={"Employee"}
                    form={form}
                    name={"employee"}
                    placeholder={"Select the employee name"}
                    data={employeProfetion}
                    validateKey={form.getInputProps("employee")}
                />
                <SelectInputField
                    label={"Leave Type"}
                    form={form}
                    name={"leave_type"}
                    placeholder={"Select the leave type"}
                    data={leaveTypes}
                    validateKey={form.getInputProps("leave_type")}
                />
                <div className="flex gap-4">
                    <DatePickerComponent datePickerLabel={"Start Date"} value={startDate}
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
                        }} minDate={startDate == new Date() ? startDate : ""} />
                    <DatePickerComponent datePickerLabel={"End Date"}
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
                        minDate={startDate} />
                </div>
                <Textarea
                    label='Reason'
                    resize="vertical"
                    placeholder="Leave Reason*"
                />

                <Group justify="space-between">
                    <Button type="submit">Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Group>
            </div>
        </form>
    )
}
export default LeaveForm;