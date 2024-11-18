import { TextInput } from "@mantine/core";

interface Value {
  withAsterisk: boolean;
  label: string;
  name: string;
  className?: string;
  placeholder: string;
  validateKey?: ValidateKey;
  value?: string;
}
type ValidateKey = {
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
};
const TextInputField: React.FC<Value> = ({
  name,
  className,
  withAsterisk,
  label,
  placeholder,
  validateKey,
  value,
}) => {
  return (
    <div className="relative h-[90px]">
      <TextInput
        label={label}
        placeholder={placeholder}
        name={name}
        withAsterisk={withAsterisk}
        value={value}
        className={className || "flex flex-col gap-1 "}
        {...validateKey}
        error={false}
      />
      {validateKey?.error && (
        <div className="absolute text-red-500 text-[12px] ">
          {validateKey.error}
        </div>
      )}
    </div>
  );
};

export default TextInputField;
