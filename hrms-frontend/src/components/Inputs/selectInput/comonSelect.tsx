import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface Role {
  id: string | number;
  label: string;
}

interface Option {
  value: string;
  label: string;
}

interface SelectValue {
  label: string;
  placeholder?: string;
  className?: string;
  validateKey?: object;
  value?: string | null;
  name: string;
  defaultValue?: string;
  customData?: unknown;
  key?: string;
  form: UseFormReturnType<any>;
  rightSection?: React.ReactNode;
  disabled?: boolean;
  start_day?: string;
  data?: { _id: string; description: string; name: string }[];
  end_day?: string;
}

const DynamicSelectBox: React.FC<SelectValue> = ({
  label,
  disabled,
  start_day,
  placeholder,
  className,
  validateKey,
  customData,
  form,
  end_day,
  value,
  name,
  data,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    form.getValues();
  }, [form]);

  useEffect(() => {
    if (data) {
      const formattedOptions = data.map((item) => ({
        value: item._id,
        label: item.description,
      }));
      setOptions(formattedOptions);
    }
  }, [data]);

  const handleSelectChange = (value: string | null) => {
    setSelectedId(value);
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={options}
      name={name}
      value={selectedId}
      onChange={handleSelectChange}
      {...validateKey}
      key={form.key(name)}
      disabled={disabled}
      className={className}
    />
  );
};

export default DynamicSelectBox;
