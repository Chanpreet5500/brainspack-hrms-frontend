import {
  departmentError,
  emailError,
  firstNameError,
  invalidEmailError,
  lastNameError,
  minfNameError,
  minlNameletter,
  numberError,
  numberRequiredError,
  roleError,
} from "@/constants/constants";

import * as Yup from "yup";

export const employeeValidationSchema = Yup.object({
  fname: Yup.string()
    .required(firstNameError)
    .test("min-length", minfNameError, (value) => {
      if (value && value.length < 3) {
        return false;
      }
      return true;
    }),

  lname: Yup.string()
    .required(lastNameError)
    .test("min-length", minlNameletter, (value) => {
      if (value && value.length < 3) {
        return false;
      }
      return true;
    }),

  email: Yup.string().required(emailError).email(invalidEmailError),

  role: Yup.string().required(roleError),

  department: Yup.string().required(departmentError),

  phoneNumber: Yup.string()
    .required(numberRequiredError)
    .matches(/^\d{10}$/, numberError),
});
