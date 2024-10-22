import { holidayType } from "@/constants/constants";
import SelectInputField from "../Inputs/selectInput/Select";
import TextInputField from "../Inputs/textInput/Input";
import { Button, Group, MantineProvider } from "@mantine/core";
import { useDeleteHolidayDataApiByNameMutation } from "@/services/holiday/holidayApi";

const HolidayForm = ({ form, triggerCreate, triggerUpdate, triggerDelete, modalClose }) => {

    const handleSubmit = async (data: any) => {
        if (data?.holiday_id) {
            await triggerUpdate(data);
        } else {
            await triggerCreate(data);
        }
        modalClose();
        form?.reset();
    };
    const onRemove = async (data) => {
        await triggerDelete(data)
        modalClose();
    }
    return (

        <form
            onSubmit={form.onSubmit((localUserDetails: any) => {
                handleSubmit(localUserDetails);
            })}  >
            <div className="flex flex-col m-auto gap-3 ">

                <TextInputField
                    withAsterisk={true}
                    name={"title"}
                    label={"Holiday Title"}
                    placeholder={"Enter the holiday title"}
                    validateKey={form.getInputProps("title")}
                />

                <TextInputField
                    withAsterisk
                    name={"description"}
                    label={"Holiday Description"}
                    placeholder={"Enter the holiday description"}
                    validateKey={form.getInputProps("description")}
                />

                <SelectInputField
                    label={"Type"}
                    form={form}
                    name={"type"}
                    placeholder={"Select Holiday Type"}
                    data={holidayType}
                    validateKey={form.getInputProps("type")}
                />

                {!form.getInputProps('title').value ? <MantineProvider>
                    <Group className=" !flex !justify-end !w-full ">
                        <Button
                            variant="default"
                            className="!h-[32px] !w-[90px] !font-[500]"
                            radius="md"
                            onClick={() => modalClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="filled"
                            className="!h-[32px] !w-[90px] !font-[500]"
                            radius="md"
                        >
                            Add
                        </Button>
                    </Group>
                </MantineProvider> : <MantineProvider>
                    <Group className=" !flex !justify-end !w-full ">
                        <Button
                            variant="filled"
                            className="!h-[32px] !w-[90px] !font-[500]"
                            radius="md"
                            onClick={() => onRemove(form.getInputProps('holiday_id').value)}
                            color="red"
                        >
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            variant="filled"
                            className="!h-[32px] !w-[90px] !font-[500]"
                            radius="md"
                        >
                            Update
                        </Button>
                    </Group>
                </MantineProvider>}

            </div>
        </form>
    )
}

export default HolidayForm