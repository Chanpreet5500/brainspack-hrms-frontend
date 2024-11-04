import { UseFormReturnType } from "@mantine/form";


export interface EmployeeFormProps {
    onClose: any;
    form: any;
    onHandelUpdate: any;
    createTrigger: any;
    token: any;
}

export interface FormProps extends UseFormReturnType<HolidayFormData> { }

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