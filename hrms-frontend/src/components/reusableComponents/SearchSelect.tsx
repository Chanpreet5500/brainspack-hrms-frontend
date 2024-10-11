import { useEffect, useState } from "react";
import { Select } from "@mantine/core";

type SelectSearchProps = {
  data: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  name?: string;
  form: any;
  validateKey?: any;
  value?: string | null;
};

const SelectSearch: React.FC<SelectSearchProps> = ({
  data,
  placeholder,
  label,
  form,
  name,
  validateKey,
  value,
}) => {
  useEffect(() => {
    form.getValues();
  }, []);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  return (
    <div className="w-full max-w-sm mx-auto">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <Select
        classNames={{
          input: "border-gray-300 rounded-md",
        }}
        searchable
        placeholder={placeholder || "Select an option"}
        data={data}
        value={searchValue || null}
        // Handle null case correctly in onChange
        onChange={(value) => setSearchValue(value)}
        // value={value || null}
        error={false}
        key={form.key(name)}
        {...validateKey}
        clearable={true}
      />
    </div>
  );
};

export default SelectSearch;
