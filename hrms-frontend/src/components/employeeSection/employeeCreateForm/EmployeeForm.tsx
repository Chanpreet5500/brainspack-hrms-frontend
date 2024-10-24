import { useEffect } from "react";
import { Button, Group, MantineProvider } from "@mantine/core";
import TextInputField from "../../Inputs/textInput/Input";
import SelectInputField from "../../Inputs/selectInput/Select";
import { employeeDepartment, employeProfetion } from "@/constants/constants";
import { variantColorResolver } from "@/constants/commonFunction";
import { useDispatch } from "react-redux";
import {
  useCreateUserMutation,
  useLazyGetAllDataApiByNameQuery,
} from "@/services/user/usersApi";
import { getAllUserData } from "@/redux/user/user";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react"; // Icons for success and error

interface value {
  onClose: any;
  form: any;
  onHandelUpdate: any;
  createTrigger: any;
}

const EmployeeForm: React.FC<value> = (props) => {
  const { onClose, form, onHandelUpdate, createTrigger } = props;
  const [postData, { data: addData, isSuccess, isError }] =
    useCreateUserMutation();
  const dispatch = useDispatch();

  const [allDataApi, { data, isSuccess: isSuccessToGetAllData }] =
    useLazyGetAllDataApiByNameQuery();

  useEffect(() => {
    if (data?.users.length > 0) {
      dispatch(getAllUserData(data?.users));
    }
  }, [data, isSuccessToGetAllData]);

  useEffect(() => {
    const params = {
      page: 1,
      limit: 5,
    };
    allDataApi(params);
  }, [isSuccess]);

  const handleSubmit = async (data: any) => {
    try {
      if (data?._id) {
        onHandelUpdate(data);
        notifications.show({
          title: "Update Successful",
          message: "Employee data updated successfully",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 1000,
        });
      } else {
        await createTrigger(data);
        notifications.show({
          title: "Creation Successful",
          message: "Employee created successfully",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 3000,
        });
      }
    } catch (error) {
      throw error;
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

        <MantineProvider theme={{ variantColorResolver }}>
          <Group className=" !flex !justify-end !w-full ">
            <Button
              variant="default"
              className="!h-[32px] !w-[90px] !font-[500]"
              radius="md"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="filled"
              className="!h-[32px] !w-[90px] !font-[500]"
              radius="md"
            >
              Submit
            </Button>
          </Group>
        </MantineProvider>
      </div>
    </form>
  );
};

export default EmployeeForm;
