"use client";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import TextInputField from "../Inputs/textInput/Input";
import SelectInputField from "../Inputs/selectInput/Select";
import { employeeDepartment, employeProfetion } from "@/constants/constants";
import { useGetCreateUserMutation } from "@/services/user/allApis/regiterUser";
import { useLazyGetAllDataApiByNameQuery } from "@/services/user/allApis/getUser";
import { useSelectedLayoutSegments } from "next/navigation";
// import { manageUserSelector } from "@/services/user/slices/allUser/userSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/services/user/slices/allUser/user";
interface value {
  onClose: any;
}
const UserForm: React.FC<value> = (props) => {
  // const [postData, { data, isSuccess, isError }] = useGetCreateUserMutation();
  const [fatchUser, { data, isLoading }] = useLazyGetAllDataApiByNameQuery();
  console.log(data, "d");
  const dispatch = useDispatch();
  // const { user } = useSelector(manageUserSelector);
  useEffect(() => {
    try {
      fatchUser("s");
      if (data) {
        dispatch(setUser(data));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  const user = useSelector((state: any) => state.userSlice.user);
  console.log(user, "final");
  const { onClose } = props;
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      role: "",
      department: "",
    },
    validate: {
      fname: (value) => {
        if (!value) {
          return "Field is required";
        }
        if (value.length < 3) {
          return "Name should be at least 3 letters";
        } else {
          return value.length > 50 ? "Name should not exceed 50 letters" : null;
        }
      },

      lname: (value) => {
        if (!value) {
          return "Field is required";
        }
        if (value.length < 3) {
          return "Name should be at least 3 letters";
        } else {
          return value.length > 50 ? "Name should not exceed 50 letters" : null;
        }
      },
      email: (value) => {
        if (!value) {
          return "Field is required";
        } else {
          return /^\S+@\S+$/.test(value) ? null : "Invalid email";
        }
      },
      role: (value) => (value ? null : "Select field is required"),
      department: (value) => (value ? null : "Select field is required"),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((localUserDetails) => {
        // postData(localUserDetails);

        return form.reset();
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <div className="flex justify-between">
          <TextInputField
            withAsterisk={true}
            name={"fname"}
            label={"First Name"}
            placeholder={"Enter your first name"}
            key={form.key("fname")}
            validateKey={form.getInputProps("fname")}
          />

          <TextInputField
            withAsterisk
            name={"lname"}
            label={"Last Name"}
            placeholder={"Enter your last name"}
            key={form.key("lname")}
            validateKey={form.getInputProps("lname")}
          />
        </div>

        <TextInputField
          withAsterisk
          label={"Email"}
          name={"email"}
          placeholder={"Enter your email address"}
          key={form.key("email")}
          validateKey={form.getInputProps("email")}
        />
        <SelectInputField
          label={"Role"}
          placeholder={"role"}
          data={employeProfetion}
          key={form.key("role")}
          validateKey={form.getInputProps("role")}
        />
        <SelectInputField
          label={"Department"}
          placeholder={"Select a department"}
          data={employeeDepartment}
          key={form.key("department")}
          validateKey={form.getInputProps("department")}
        />

        <Group className=" !flex !justify-between !w-full ">
          <Button type="submit">Submit</Button>
          <Button onClick={() => form.reset()}>Reset</Button>
          {/* <Button onClick={onClose}>Cancel</Button> */}
          <Button onClick={() => dispatch(setUser(data))}>Cancel</Button>
        </Group>
      </div>
    </form>
  );
};

export default UserForm;
