import * as Yup from "yup";

export const leavePolicySchema = Yup.object({
  name: Yup.string().required("Please select the leave type name"),
  description: Yup.string().required("Please select the type of description"),
});
