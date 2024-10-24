import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
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
  customData?: any;
  key?: string;
  form: any;
  rightSection?: any;
  disabled?: boolean;
  start_day?: string;
  data?: any;
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
  useEffect(() => {
    form.getValues();
  }, []);
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (data) {
      const formattedOptions = data.map((item: any) => ({
        value: item._id,
        label: item.description,
      }));
      setOptions(formattedOptions);
    }
  }, [data]);

  const handleSelectChange = (value: any) => {
    setSelectedId(value);
    console.log("Selected ID:", value);
  };
  if (data) {
    const formattedOptions = data.map((item: any) => ({
      value: item._id,
      label: item.name,
    }));
  }

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
    />
  );
};

export default DynamicSelectBox;
