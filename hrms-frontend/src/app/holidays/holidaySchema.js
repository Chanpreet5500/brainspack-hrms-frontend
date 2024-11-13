import * as Yup from "yup";

export const holidaySchema = Yup.object({
  title: Yup.string()
    .required("Field is required")
    .min(5, "Title should be at least 5 letters")
    .max(20, "Title should not exceed 20 letters"),

  description: Yup.string()
    .required("Field is required")
    .min(5, "Description should be at least 5 letters")
    .max(50, "Description should not exceed 50 letters"),

  type: Yup.string().required("Select field is required"),
});
