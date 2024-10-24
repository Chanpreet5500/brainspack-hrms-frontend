// import { manageUserSelector } from "@/redux/user/userSelector";
import { TextInput } from "@mantine/core";
import { useSelector } from "react-redux";

interface Value {
  withAsterisk: boolean;
  label: string;
  name: string;
  className?: string;
  placeholder: string;
  key?: string;
  validateKey?: any;
  value?: any;
}

const TextInputField: React.FC<Value> = (props) => {
  const {
    name,
    className,
    withAsterisk,
    label,
    placeholder,
    validateKey,
    value,
  } = props;

  return (
    <div className="relative mb-2">
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
        <div className="absolute text-red-500 text-[12px] bottom-[-20px]">
          {validateKey.error}
        </div>
      )}
    </div>
  );
};

export default TextInputField;
