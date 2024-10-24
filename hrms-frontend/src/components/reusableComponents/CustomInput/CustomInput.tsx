interface CustomInputProps {
  name: string;
  classname?: string;
  placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  classname,
  placeholder,
}) => {
  return (
    <input
      name={name}
      className={`border black h-full rounded pl-[10px] ${classname}`}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
