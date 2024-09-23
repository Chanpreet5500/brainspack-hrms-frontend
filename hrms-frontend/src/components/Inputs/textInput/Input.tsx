import { TextInput } from "@mantine/core";
interface value {
  withAsterisk: boolean;
  label: string;
}
const TextInputField = (prop: value) => {
  const { withAsterisk, label } = prop;
  return (
    <>
      <TextInput
        label={label}
        placeholder="Name"
        name=""
        withAsterisk={withAsterisk}
      />
    </>
  );
};
export default TextInputField;
