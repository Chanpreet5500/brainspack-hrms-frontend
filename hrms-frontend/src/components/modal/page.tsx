import { Button, Group } from "@mantine/core";
import TextInputField from "../Inputs/textInput/Input";
import SelectInputField from "../Inputs/selectInput/Select";
import { employeeDepartment, employeProfetion } from "@/constants/constants";
import { useGetCreateUserMutation } from "@/services/user/allApis/regiterUser";

interface value {
  onClose: any;
  form: any;
}


const UserForm: React.FC<value> = (props) => {
  const { form, onClose } = props;
  const [postData] = useGetCreateUserMutation();
  console.log(form.getValues(), "values");
  const handleSubmit = (data: any) => {
    postData(data);
    console.log(data, "ll");
    onClose();
    form.reset();
  };
  return (
    <form
      onSubmit={form.onSubmit((localUserDetails: string) => {
        handleSubmit(localUserDetails);
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <div className="flex justify-between">
          <TextInputField
            withAsterisk={true}
            name={"fname"}
            label={"First Name"}
            placeholder={"Enter your first name"}
            validateKey={form.getInputProps("fname")}
          />

          <TextInputField
            withAsterisk
            name={"lname"}
            label={"Last Name"}
            placeholder={"Enter your last name"}
            validateKey={form.getInputProps("lname")}
          />
        </div>

        <TextInputField
          withAsterisk
          label={"Email"}
          name={"email"}
          placeholder={"Enter your email address"}
          validateKey={form.getInputProps("email")}
        />

        <SelectInputField
          label={"Role"}
          form={form}
          name={"role"}
          placeholder={"Select your role"}
          data={employeProfetion}
          validateKey={form.getInputProps("role")}
        />

        <SelectInputField
          label={"Department"}
          form={form}
          name={"department"}
          placeholder={"Select a department"}
          data={employeeDepartment}
          validateKey={form.getInputProps("department")}
        />

        <Group className=" !flex !justify-between !w-full ">
          <Button type="submit">Submit</Button>
          <Button onClick={onClose}>Cancel</Button>
        </Group>
      </div>
    </form>
  );
};

export default UserForm;
