"use client";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import TextInputField from "../Inputs/textInput/Input";
import SelectInputField from "../Inputs/selectInput/Select";
import { employeeDepartment, employeProfetion } from "@/constants/constants";

const UserForm = () => {
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
      onSubmit={form.onSubmit((handleError) => {
        console.log(handleError);
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
          <Button onClick={() => form.reset()}>Cancel</Button>
        </Group>
      </div>
    </form>
  );
};

export default UserForm;

// import { Button, Group } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { notifications } from "@mantine/notifications";
// import TextInputField from "../Inputs/textInput/Input";
// import SelectInputField from "../Inputs/selectInput/Select";
// import { employeeDepartment, employeProfetion } from "@/constants/constants";

// const UserForm = () => {
//   const form = useForm({
//     mode: "uncontrolled",
//     validateInputOnChange: true,
//     initialValues: {
//       fname: "",
//       lname: "",
//       email: "",
//       role: "",
//       department: "",
//     },
//     validate: {
//       fname: (value) => {
//         if (!value) {
//           return (
//             <div className="absolute bottom-[-8px]">"field is required"</div>
//           );
//         }
//         if (value.length < 3) {
//           return (
//             <div className="absolute bottom-[-8px]">
//               "Name atlest 3 letters"
//             </div>
//           );
//         } else {
//           return value.length > 50 ? "Name shoud not exceed 50 letters" : null;
//         }
//       },

//       lname: (value) => {
//         if (!value) {
//           return (
//             <div className="absolute bottom-[-8px]">"field is required"</div>
//           );
//         }
//         if (value.length < 3) {
//           return (
//             <div className="absolute bottom-[-8px]">
//               "Name atlest 3 letters"
//             </div>
//           );
//         } else {
//           return value.length > 50 ? (
//             <div className="absolute bottom-[-8px]">
//               "Name shoud not exceed 50 letters"
//             </div>
//           ) : null;
//         }
//       },
//       email: (value) => {
//         if (!value) {
//           return (
//             <div className="absolute bottom-[-8px]">"field is required"</div>
//           );
//         } else {
//           return /^\S+@\S+$/.test(value) ? null : (
//             <div className="absolute bottom-[-8px]">"Invalid email"</div>
//           );
//         }
//       },
//       role: (value) =>
//         value ? null : (
//           <div className="absolute bottom-[-8px]">
//             "select field are requird"
//           </div>
//         ),
//       department: (value) =>
//         value ? null : (
//           <div className="absolute bottom-[-8px]">
//             "select field are requird"
//           </div>
//         ),
//     },
//   });
//   // const handleError = (errors: typeof form.errors) => {
//   //   if (errors.name) {
//   //     notifications.show({ message: "Please fill name field", color: "red" });
//   //   } else if (errors.email) {
//   //     notifications.show({
//   //       message: "Please provide a valid email",
//   //       color: "red",
//   //     });
//   //   }
//   // };

//   return (
//     <form
//       onSubmit={form.onSubmit((handleError) => {
//         console.log(handleError);
//         return form.reset();
//       })}
//     >
//       <div className=" flex flex-col m-auto gap-3 ">
//         <div className="flex justify-between">
//           <TextInputField
//             withAsterisk={true}
//             name={"fname"}
//             label={"First Name"}
//             placeholder={"Enter your first name"}
//             key={form.key("fname")}
//             validateKey={form.getInputProps("fname")}
//           />

//           <TextInputField
//             withAsterisk
//             name={"lname"}
//             label={"Last Name"}
//             placeholder={"Enter your last name"}
//             key={form.key("lname")}
//             validateKey={form.getInputProps("lname")}
//           />
//         </div>

//         <TextInputField
//           withAsterisk
//           label={"Email"}
//           name={"email"}
//           placeholder={"Enter your email address"}
//           key={form.key("email")}
//           validateKey={form.getInputProps("email")}
//         />
//         <SelectInputField
//           label={"Role"}
//           placeholder={"role"}
//           data={employeProfetion}
//           key={form.key("role")}
//           validateKey={form.getInputProps("role")}
//         />
//         <SelectInputField
//           label={"Department"}
//           placeholder={"Select a department"}
//           data={employeeDepartment}
//           key={form.key("department")}
//           validateKey={form.getInputProps("department")}
//         />

//         <Group className=" !flex !justify-between !w-full ">
//           <Button type="submit">Submit</Button>
//           <Button onClick={() => form.reset()}>Cancel</Button>
//         </Group>
//       </div>
//     </form>
//   );
// };
// export default UserForm;
