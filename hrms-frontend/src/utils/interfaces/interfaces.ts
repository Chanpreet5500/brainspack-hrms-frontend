import { UseFormReturnType } from "@mantine/form";

export interface EmployeeFormProps {
  onClose: any;
  form: any;
  onHandelUpdate: any;
  createTrigger: any;
  token: any;
}

export interface FormProps extends UseFormReturnType<HolidayFormData> {}

export interface ModalClose {
  (): void;
}

export interface HolidayFormProps {
  form: FormProps;
  modalClose: ModalClose;
}

export interface HolidayFormData {
  holiday_id?: string;
  title: string;
  description: string;
  type: string;
  date: string;
}
export interface CreateLeavePolicyRequest {
  leave_type_id: string;
  max_leaves_per_year: string | number;
  token: string;
}
export interface CreateLeavePolicyResponse {
  success: boolean;
  message: string;
  data?: {
    leave_type_id: string;
    max_leaves_per_year: number;
    _id: string;
  };
}
