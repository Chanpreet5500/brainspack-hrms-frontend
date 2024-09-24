import { useState } from "react";
import { DatePickerInput } from '@mantine/dates';

interface DatePickerProps{
    datePickerLabel: string
}

export const DatePickerComponent = ({datePickerLabel}:DatePickerProps) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <DatePickerInput
        clearable
        defaultValue={new Date()}
        label={datePickerLabel}
        placeholder="mm/dd/yyyy"
        value={value}
        className="w-full"
        onChange={setValue}
      />
    );
}