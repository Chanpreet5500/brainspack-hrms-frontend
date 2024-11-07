"use client";
import { Button, Group, MantineProvider, Textarea } from "@mantine/core";
import { variantColorResolver } from "@/utils/commonFunction";
import { useDispatch } from "react-redux";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import TextInputField from "../Inputs/textInput/Input";
import TextAreaField from "../Inputs/textArea/TextArea";
interface dataValue {
  onClose: any;
  triggerCreate: any;
  form: any;
  token: any;
  createSuccess: any;
}
<<<<<<< HEAD
const TypeForm: React.FC<dataValue> = ({ onClose, triggerCreate, form }) => {
=======
const TypeForm: React.FC<dataValue> = ({
  onClose,
  triggerCreate,
  triggerUpdate,
  form,
  token,
  createSuccess,
}) => {
>>>>>>> 14c7371f25c66e6298c9114c85fcc8ed5d2523cf
  const dispatch = useDispatch();

  const handleSubmit = async (data: any) => {
    console.log(data, "data");
    try {
<<<<<<< HEAD
      await triggerCreate(data);
      {
=======
      if (data?._id) {
        triggerUpdate(data);
>>>>>>> 14c7371f25c66e6298c9114c85fcc8ed5d2523cf
        notifications.show({
          title: "Leave Type Successful",
          message: "Leave Type data created successfully",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 1000,
        });
      } else {
        await triggerCreate({ data: data, token: token });

        {
          createSuccess
            ? notifications.show({
                title: "Leave Type Successful",
                message: "Leave Type data created successfully",
                color: "green",
                icon: <IconCheck size={18} />,
                autoClose: 1000,
              })
            : notifications.show({
                title: "Leave Type Unsuccessful",
                message: "Leave Type data Not created",
                color: "red",
                icon: <IconCheck size={18} />,
                autoClose: 1000,
              });
        }
      }
    } catch (err) {
      console.error("Error creating leave:", err);
    }
  };

  let data = form.getValues();
  return (
    <form
      onSubmit={form.onSubmit((values: any) => {
        handleSubmit(values);
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <TextInputField
          withAsterisk={true}
          label={"Name"}
          name={"name"}
          placeholder={"Select the type policies"}
          validateKey={form.getInputProps("name")}
        />
        <TextAreaField
          withAsterisk={true}
          label="Description"
          name={"description"}
          resize="vertical"
          placeholder="Leave Description*"
          validateKey={form.getInputProps("description")}
        />
        <MantineProvider theme={{ variantColorResolver }}>
          <Group className=" !flex !justify-end !w-full ">
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
