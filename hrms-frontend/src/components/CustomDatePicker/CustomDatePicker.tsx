import { useState } from "react";
import { DatePickerInput } from '@mantine/dates';

interface DatePickerProps {
  datePickerLabel: string
  value: any
  onChange: any
  minDate: any
  defaultvalue: any
  isEndDate?: boolean;
}

export const DatePickerComponent = ({ datePickerLabel, value, onChange, minDate, defaultvalue, isEndDate, }: DatePickerProps) => {
  // const [value, setValue] = useState<Date | null>(new Date());
  return (
    <DatePickerInput
      clearable
      allowDeselect
      defaultValue={defaultvalue}
      label={datePickerLabel}
      placeholder="mm/dd/yyyy"
      value={value}
      minDate={minDate || new Date()}
      className="w-full"
      onChange={onChange}
      excludeDate={(date) => date.getDay() == 6 || date.getDay() == 0}
    />
  );
}