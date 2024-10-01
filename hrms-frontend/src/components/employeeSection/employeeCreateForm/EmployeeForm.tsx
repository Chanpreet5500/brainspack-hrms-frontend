import { Button, Group } from "@mantine/core";
import TextInputField from "../../Inputs/textInput/Input";
import SelectInputField from "../../Inputs/selectInput/Select";
import { employeeDepartment, employeProfetion } from "@/constants/constants";
import { useGetCreateUserMutation } from "@/services/user/allApis/regiterUser";
import { useUpdateDataApiByNameMutation } from "@/services/user/allApis/updateUser";
interface value {
  onClose: any;
  form: any;
  onHandelUpdate: any;
}
const EmployeeForm: React.FC<value> = (props) => {
  const { onClose, form, onHandelUpdate } = props;
  const [postData] = useGetCreateUserMutation();
  const [updateUserData, { data: updatedata }] =
    useUpdateDataApiByNameMutation();
  const handleSubmit = (data: any) => {
    console.log(data, "data");
    console.log(data, "vifdffbhvl");

    if (data?._id) {
      onHandelUpdate(data);
    } else {
      postData(data);
    }
    onClose();
    form.reset();
  };
  return (
    <form
      onSubmit={form.onSubmit((localUserDetails: any) => {
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

export default EmployeeForm;
