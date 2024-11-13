import * as Yup from "yup";

export const employeeValidationSchema = Yup.object({
  fname: Yup.string()
    .required("First name is required")
    .min(3, "field is required"),

  lname: Yup.string()
    .required("Last name is required")
    .min(3, "field is required"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  role: Yup.string().required("Role is required"),

  department: Yup.string().required("Department is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must contain exactly 10 digits"),
});
