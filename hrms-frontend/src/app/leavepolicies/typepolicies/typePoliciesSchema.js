import { leaveNameError, descriptionError } from "@/constants/constants";
import * as Yup from "yup";

export const leavePolicySchema = Yup.object({
  name: Yup.string().required(leaveNameError),

  description: Yup.string().required(descriptionError),
});
