import {
  assignedToError,
  leaveNameError,
  reasonError,
  startDateError,
} from "@/constants/constants";
import { DateFormatConvertor } from "@/utils/commonFunction";
import * as Yup from "yup";

export const leaveValidationSchema = Yup.object({
  employee: Yup.string().required(assignedToError),
  leave_type_id: Yup.string().required(leaveNameError),

  start_date: Yup.string()
    .required(startDateError)
    .test("valid-date", "Please provide a valid start date.", (value) => {
      return DateFormatConvertor(value) ? true : false;
    }),

  end_date: Yup.string()
    .required("Please select the end date.")
    .test("valid-date", "Please provide a valid end date.", (value) => {
      return DateFormatConvertor(value);
    }),
  reason: Yup.string().required(reasonError),
});
