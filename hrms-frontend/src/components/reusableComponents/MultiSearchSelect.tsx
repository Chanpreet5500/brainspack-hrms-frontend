import { MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";

// Define a more specific type for form values
type FormValues = Record<string, string[] | string | null>;

type FormType = {
  values: FormValues;
  errors: Record<string, string | undefined>;
  setFieldValue: (name: string, value: string[]) => void;
  key: (name: string) => string;
};

type User = {
  _id: string;
  fname: string;
  lname: string;
};

type SelectSearchProps = {
  data: { users: User[] };
  placeholder?: string;
  label?: string;
  name: keyof FormType["values"];
  form: FormType;
  validateKey?: string;
  value?: string | null;
};
type Option = {
  value: string;
  label: string;
};

const MultiSearchSelect: React.FC<SelectSearchProps> = ({
  data,
  placeholder,
  label,
  form,
  name,
  validateKey,
  value,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (data?.users) {
      const employeeOptions = data.users.map((user) => ({
        value: user._id,
        label: `${user.fname} ${user.lname}`,
      }));
      setOptions(employeeOptions);
    }
    ``;
  }, [data]);

  const selectedValue = Array.isArray(form.values[name])
    ? form.values[name]
    : form.values[name] != null
    ? [form.values[name]]
    : [];

  const handleSelectChange = (value: string[]) => {
    form.setFieldValue(name, value);
  };

  const error = form.errors[name];

  return (
    <div className="w-full mx-auto">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <MultiSelect
        classNames={{
          input: "border-gray-300 rounded-md",
        }}
        maxDropdownHeight={300}
        checkIconPosition="right"
        placeholder={placeholder || "Select an option"}
        data={options}
        value={selectedValue}
        onChange={handleSelectChange}
        error={error}
        clearable={true}
        hidePickedOptions
        key={form.key(name)}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
        searchable
        nothingFoundMessage="Nothing found..."
      />
    </div>
  );
};

export default MultiSearchSelect;
