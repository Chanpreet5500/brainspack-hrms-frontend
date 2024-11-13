import { DateFormatConvertor } from "@/utils/commonFunction";
import * as Yup from "yup";

export const leaveValidationSchema = Yup.object({
  employee: Yup.string().required("Please select an employee."),
  leave_type_id: Yup.string().required("Please select a leave type."),

  start_date: Yup.string()
    .required("Please select the start date.")
    .test("valid-date", "Please provide a valid start date.", (value) => {
      return DateFormatConvertor(value) ? true : false;
    }),

  end_date: Yup.string()
    .required("Please select the end date.")
    .test("valid-date", "Please provide a valid end date.", (value) => {
      return DateFormatConvertor(value);
    }),
  reason: Yup.string().required("reason is requirewd "),
});
