"use client";
import { Button, Group, Input, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import TextInputField from "../Inputs/textInput/Input";

const UserForm = () => {
  const form = useForm({
    mode: "uncontrolled",
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
          return "field is required";
        } else {
          return value.length > 50 ? "Name shoud not exceed 50 letters" : null;
        }
      },

      lname: (value) => {
        if (!value) {
          return "field is required";
        } else {
          return value.length > 50 ? "Name shoud not exceed 50 letters" : null;
        }
      },
      email: (value) => {
        if (!value) {
          return "field is required";
        } else {
          return /^\S+@\S+$/.test(value) ? null : "Invalid email";
        }
      },
      role: (value) => (value ? null : "select field are requird"),
      department: (value) => (value ? null : "select field are requird"),
    },
  });

  console.log(form.getInputProps("role"), "role creation");

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: "Please fill name field", color: "red" });
    } else if (errors.email) {
      notifications.show({
        message: "Please provide a valid email",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleError)}>
      <div className=" flex flex-col m-auto gap-3">
        <TextInput
          withAsterisk={true}
          className=" flex flex-col gap-1"
          label={"First Name"}
          placeholder="Enter your first name"
          key={form.key("fname")}
          {...form.getInputProps("fname")}
        />
        <TextInput
          withAsterisk
          label="Last Name"
          className=" flex flex-col gap-1"
          placeholder="Enter your last name"
          key={form.key("lname")}
          {...form.getInputProps("lname")}
        />
        <TextInput
          withAsterisk
          label="Email"
          className=" flex flex-col gap-1"
          placeholder="Enter your email address"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <Select
          label="Role"
          className=" flex flex-col gap-1"
          placeholder="Select a role"
          data={[
            {
              label: "Admin",
              value: "admin",
            },
            { label: "HR", value: "hr" },
            { label: "Employee", value: "employee" },
          ]}
          key={form.key("role")}
          {...form.getInputProps("role")}
        />
        <Select
          label="Department"
          className=" flex flex-col gap-1"
          placeholder="Select a department"
          data={[
            "Human Resource (HR)",
            "Software Engineering",
            "User Experience (UX)",
          ]}
          key={form.key("department")}
          {...form.getInputProps("department")}
        />
        <Group className=" !flex !justify-between !w-full ">
          <Button type="submit">Submit</Button>
          <Button type="button">Cancel</Button>
        </Group>
      </div>
    </form>
  );
};
export default UserForm;
