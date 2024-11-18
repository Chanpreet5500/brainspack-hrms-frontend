import * as Yup from "yup";
import { projectNameError, assignedToError } from "@/constants/constants";
export const projectValidationSchema = Yup.object({
  name: Yup.string().required(projectNameError),
  assigned_to: Yup.array()
    .of(Yup.string().required(assignedToError))
    .min(1, "At least one user must be assigned")
    .required(assignedToError),
});
