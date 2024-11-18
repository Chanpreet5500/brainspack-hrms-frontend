import * as Yup from "yup";
import { projectNameError, assignedToError } from "@/constants/constants";

export const projectValidationSchema = Yup.object({
  name: Yup.string().required(projectNameError),
  assigned_to: Yup.string().required(assignedToError),
});
