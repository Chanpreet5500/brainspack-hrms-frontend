import { Select } from "@mantine/core";
import { useEffect } from "react";

interface Role {
  id: string | Number;
  label: string;
}

interface SelectValue {
  label: string;
  placeholder?: string;
  className?: string;
  validateKey?: any;
  value?: string | null;
  name: string;
  defaultValue?: string;
  data?: Role[];
  key?: string;
  form: any;
  rightSection?: any;
  disabled?: boolean;
  start_day?: string;
  end_day?: string;
}

const SelectInputField: React.FC<SelectValue> = ({
  label,
  disabled,
  start_day,
  placeholder,
  className,
  validateKey,
  data,
  form,
  end_day,
  value,
  name,
}) => {
  useEffect(() => {
    form.getValues();
  }, []);

  return (
    <div className="relative mb-2">
      <Select
        checkIconPosition="right"
        label={label}
        placeholder={placeholder}
        className={className || "flex flex-col gap-1"}
        data={data}
        name={name}
        value={value || null}
        error={false}
        key={form.key(name)}
        {...validateKey}
        clearable={true}
        start_day={start_day}
        end_day={end_day}
        disabled={disabled}
      />
    </div>
  );
};

export default SelectInputField;
