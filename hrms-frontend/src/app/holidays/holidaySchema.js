import * as Yup from "yup";

import {
  descriptionError,
  holidayTitleError,
  holidayTypeError,
} from "@/constants/constants";

export const holidaySchema = Yup.object({
  title: Yup.string().required(holidayTitleError),

  description: Yup.string().required(descriptionError),

  type: Yup.string().required(holidayTypeError),
});
