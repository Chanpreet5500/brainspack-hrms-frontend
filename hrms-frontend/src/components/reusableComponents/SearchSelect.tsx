import { useEffect, useState } from "react";
import { Select } from "@mantine/core";

type SelectSearchProps = {
  data: any;
  placeholder?: string;
  label?: string;
  name?: string;
  form: any;
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
  const [searchValue, setSearchValue] = useState<string | null>(null);
  useEffect(() => {
    form.getValues();
  }, []);
  return (
    <div className="w-full  mx-auto">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <Select
        classNames={{
          input: "border-gray-300 rounded-md",
        }}
        searchable
        placeholder={placeholder || "Select an option"}
        data={data || []}
        value={searchValue || null}
        onChange={(value) => setSearchValue(value)}
        error={false}
        key={form.key(name)}
        {...validateKey}
        clearable={true}
      />
    </div>
  );
};

export default SearchSelect;
