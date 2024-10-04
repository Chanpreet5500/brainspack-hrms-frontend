import { useEffect } from "react";
import {
  Button,
  defaultVariantColorsResolver,
  Group,
  MantineProvider,
  parseThemeColor,
  VariantColorsResolver,
} from "@mantine/core";
import TextInputField from "../../Inputs/textInput/Input";
import SelectInputField from "../../Inputs/selectInput/Select";
import { employeeDepartment, employeProfetion } from "@/constants/constants";
import { useDispatch } from "react-redux";
import { getAllUserData } from "@/services/user/slices/allUser/user";
import {
  useCreateUserMutation,
  useLazyGetAllDataApiByNameQuery,
} from "@/services/user/allApis/usersApi";
interface value {
  onClose: any;
  form: any;
  onHandelUpdate: any;
}
const EmployeeForm: React.FC<value> = (props) => {
  const { onClose, form, onHandelUpdate } = props;
  const [postData, { data: addData, isSuccess, isError }] =
    useCreateUserMutation();
  const dispatch = useDispatch();
  const variantColorResolver: VariantColorsResolver = (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const parsedColor = parseThemeColor({
      color: input.color || input.theme.primaryColor,
      theme: input.theme,
    });
    if (input.variant === "default") {
      return {
        background: "transparent",
        hover: "#dcdcdc",
        color: "black",
        border: "none",
      };
    }

    return defaultResolvedColors;
  };

  const [allDataApi, { data, error, isLoading }] =
    useLazyGetAllDataApiByNameQuery();

  useEffect(() => {
    if (data?.users.length > 0) {
      dispatch(getAllUserData(data?.users));
    }
  }, [data]);

  const handleSubmit = async (data: any) => {
    if (data?._id) {
      onHandelUpdate(data);
    } else {
      const creteUser = await postData(data);

      const params = {
        page: 1,
        limit: 11,
      };
      await allDataApi(params);
    }
    onClose();
    form.reset();
  };
  console.log("test commit");
  return (
    <form
      onSubmit={form.onSubmit((localUserDetails: any) => {
        handleSubmit(localUserDetails);
      })}
    >
      <div className="flex flex-col m-auto gap-3 ">
        <div className="flex justify-between">
          <TextInputField
            withAsterisk={true}
            name={"fname"}
            label={"First Name"}
            placeholder={"Enter your first name"}
            validateKey={form.getInputProps("fname")}
          />

          <TextInputField
            withAsterisk
            name={"lname"}
            label={"Last Name"}
            placeholder={"Enter your last name"}
            validateKey={form.getInputProps("lname")}
          />
        </div>

        <TextInputField
          withAsterisk
          label={"Email"}
          name={"email"}
          placeholder={"Enter your email address"}
          validateKey={form.getInputProps("email")}
        />

        <SelectInputField
          label={"Role"}
          form={form}
          name={"role"}
          placeholder={"Select your role"}
          data={employeProfetion}
          validateKey={form.getInputProps("role")}
        />

        <SelectInputField
          label={"Department"}
          form={form}
          name={"department"}
          placeholder={"Select a department"}
          data={employeeDepartment}
          validateKey={form.getInputProps("department")}
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

export default EmployeeForm;
