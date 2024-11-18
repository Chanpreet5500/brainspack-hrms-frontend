import * as Yup from "yup";

export const employeeValidationSchema = Yup.object({
  fname: Yup.string().required(firstNameError).min(3, minfNameError),

  lname: Yup.string().required(lastNameError).min(3, minlNameletter),

  email: Yup.string().required(emailError).email(invalidEmailError),

  role: Yup.string().required(roleError),

  department: Yup.string().required(departmentError),

  phoneNumber: Yup.string()
    .required(numberRequiredError)
    .matches(/^\d{10}$/, numberError),
});
