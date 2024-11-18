import { MultiSelect, Select } from "@mantine/core";
import { useEffect, useState } from "react";

type FormType = {
  values: Record<string, any>;
  errors: Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  key: (name: string) => string;
};

type SelectSearchProps = {
  data: any;
  placeholder?: string;
  label?: string;
  name: keyof FormType["values"]; // Ensure `name` is a key in `values`
  form: FormType;
  validateKey?: any;
  value?: string | null;
};
const SearchSelect: React.FC<SelectSearchProps> = ({
  data,
  placeholder,
  label,
  form,
  name,
  validateKey,
  value,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data) {
      setOptions(data);
    }
  }, [data]);

  const handleSelectChange = (value: any) => {
    form.setFieldValue(name, value);
  };

  const error = form.errors[name];
  return (
    <div className="w-full mx-auto">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <Select
        classNames={{
          input: "border-gray-300 rounded-md",
        }}
        maxDropdownHeight={300}
        checkIconPosition="right"
        placeholder={placeholder || "Select an option"}
        data={options}
        value={form.values[name] || []}
        onChange={handleSelectChange}
        error={error}
        clearable={true}
        key={form.key(name)}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
        searchable
        nothingFoundMessage="Nothing found..."
      />
    </div>
  );
};

export default SearchSelect;
