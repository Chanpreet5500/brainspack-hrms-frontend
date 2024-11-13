import * as Yup from "yup";

export const numberOfLeavesSchema = Yup.object({
  leave_type_id: Yup.string().required("Please select the type of leave"),
  max_leaves_per_year: Yup.number()
    .typeError("Please enter a valid number for max leaves per year.")
    .positive("Max leaves per year must be a positive number.")
    .integer("Max leaves per year must be an integer.")
    .required("Max leaves per year is required."),
});
