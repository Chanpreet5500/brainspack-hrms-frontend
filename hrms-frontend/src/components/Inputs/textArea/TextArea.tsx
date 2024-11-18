import { Textarea } from "@mantine/core";
interface Value {
  withAsterisk: boolean;
  label: string;
  name: string;
  className?: string;
  placeholder: string;
  key?: string;
  validateKey?: ValidateKey;
  value?: string | number;
  resize?: "none" | "both" | "horizontal" | "vertical";
}
type ValidateKey = {
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string;
};
const TextAreaField: React.FC<Value> = (props) => {
  const {
    name,
    className,
    withAsterisk,
    label,
    placeholder,
    resize,
    validateKey,
    value,
  } = props;
  return (
    <div className="relative mb-2">
      <Textarea
        label={label}
        placeholder={placeholder}
        name={name}
        withAsterisk={withAsterisk}
        value={value}
        resize={resize}
        className={className || "flex flex-col gap-1"}
        {...validateKey}
        error={validateKey?.error}
      />
      {validateKey?.error && (
        <div className="absolute text-red-500 text-[12px]">
          {validateKey.error}
        </div>
      )}
    </div>
  );
};
export default TextAreaField;
