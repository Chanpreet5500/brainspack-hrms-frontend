import { Select } from "@mantine/core";
import { useEffect } from "react";

interface Role {
  id: number;
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
  data: Role[];
  key?: string;
  form: any;
}

const SelectInputField: React.FC<SelectValue> = ({
  label,
  placeholder,
  className,
  validateKey,
  data,
  form,
  key,
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
      />
    </div>
  );
};

export default SelectInputField;
