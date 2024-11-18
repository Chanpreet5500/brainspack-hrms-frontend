import {
  integerNumberError,
  leaveNameError,
  maxLeavesError,
  postiveNumberError,
  validNumberError,
} from "@/constants/constants";
import * as Yup from "yup";

export const numberOfLeavesSchema = Yup.object({
  leave_type_id: Yup.string().required(leaveNameError),
  max_leaves_per_year: Yup.number()
    .typeError(validNumberError)
    .positive(postiveNumberError)
    .integer(integerNumberError)
    .required(maxLeavesError),
});
