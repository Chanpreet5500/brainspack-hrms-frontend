import { Select } from "@mantine/core";

interface Role {
  id: number;
  label: string;
  value: string;
}

interface SelectValue {
  label: string;
  placeholder?: string;
  className?: string;
  validateKey?: any;
  data: Role[];
}

const SelectInputField: React.FC<SelectValue> = ({
  label,
  placeholder,
  className,
  validateKey,
  data,
}) => {
  return (
    <div className="relative mb-2">
      <Select
        label={label}
        placeholder={placeholder}
        className={className || "flex flex-col gap-1"}
        data={data}
        {...validateKey}
        error={false}
      />
      {validateKey?.error && (
        <div className="absolute text-red-500 text-[12px] bottom-[-20px]">
          {validateKey.error}
        </div>
      )}
    </div>
  );
};

export default SelectInputField;
