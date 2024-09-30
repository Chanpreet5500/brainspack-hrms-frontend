"use client"

import { useForm } from "@mantine/form";
import SelectInputField from "../../Inputs/selectInput/Select";
import { Button, Group, Textarea } from "@mantine/core";
import { DatePickerComponent } from "../../CustomDatePicker/CustomDatePicker";
import { employeProfetion, leaveTypes } from "@/constants/constants";
import { useState } from "react";

interface value {
    onClose: any;
}

const LeaveForm: React.FC<value> = ({ onClose }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(startDate);
    const handleSubmit = (data: any) => {
        onClose();
        form.reset();
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
            start_date: (value) => (value ? null : "Please Select the start Date."),
            end_date: (value) => (value ? null : "Please Select the End Date"),
        },
    });
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