"use client";
import { useDispatch } from "react-redux";
import { Button, Group, MantineProvider } from "@mantine/core";
import { variantColorResolver } from "@/utils/commonFunction";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import TextInputField from "../Inputs/textInput/Input";
import TextAreaField from "../Inputs/textArea/TextArea";
import { UseFormReturnType } from "@mantine/form";

interface FormValues {
  _id?: string;
  name: string;
  description: string;
  [key: string]: any;
}

interface DataValue {
  onClose: () => void;
  triggerCreate: (params: { data: FormValues; token: string }) => Promise<void>;
  triggerUpdate: (data: FormValues) => void;
  form: UseFormReturnType<FormValues>;
  token: string;
  createSuccess: boolean;
}

const TypeForm: React.FC<DataValue> = ({
  onClose,
  triggerCreate,
  triggerUpdate,
  form,
  token,
  createSuccess,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (data: FormValues) => {
    try {
      if (data._id) {
        triggerUpdate(data);
        notifications.show({
          title: "Update Successful",
          message: "Employee data updated successfully",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 1000,
        });
      } else {
        await triggerCreate({ data, token });
        notifications.show({
          title: createSuccess
            ? "Leave Type Successful"
            : "Leave Type Unsuccessful",
          message: createSuccess
            ? "Leave Type data created successfully"
            : "Leave Type data not created",
          color: createSuccess ? "green" : "red",
          icon: <IconCheck size={18} />,
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error("Error creating leave:", err);
    }
    onClose();
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="flex flex-col m-auto gap-3 ">
        <TextInputField
          withAsterisk
          label="Name"
          name="name"
          placeholder="Select the type policies"
          validateKey={form.getInputProps("name")}
        />
        <TextAreaField
          withAsterisk
          label="Description"
          name="description"
          resize="vertical"
          placeholder="Leave Description*"
          validateKey={form.getInputProps("description")}
        />
        <MantineProvider theme={{ variantColorResolver }}>
          <Group className="!flex !justify-end !w-full">
            <Button
              variant="default"
              className="!h-[32px] !w-[90px] !font-[500]"
              radius="md"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="filled"
              className="!h-[32px] !w-[90px] !font-[500]"
              radius="md"
            >
              Submit
            </Button>
          </Group>
        </MantineProvider>
      </div>
    </form>
  );
};

export default TypeForm;
