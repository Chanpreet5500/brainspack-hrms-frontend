import { Card, Text, Group, Menu } from "@mantine/core";
interface allValue {
  allPolicies: [];
  open: any;
  form: any;
  module: string;
}
export const CustumCard: React.FC<allValue> = ({
  allPolicies,
  open,
  form,
  module,
}) => {
  const updateData = (row: any) => {
    open();
    form.setValues({
      leave_policy_id: row?._id,
      max_leaves_per_year: row?.max_leaves_per_year,
      leave_type_id: row?.leave_type_id?._id || "",
    });
  };

  return (
    <>
      {allPolicies?.map((curr: any, indx: Number) => (
        <>
          <div className="w-[35%] rounded-2xl p-5 flex h-[200px] bg-black justify-center items-center">
            <Card
              className=" shadow-sm p-lg rounded-2xl h-[150px] w-[90%]"
              withBorder
            >
              <Group justify="space-between" mt="md" mb="xs">
                {module == "leavePolicies" ? (
                  <Text fw={500}>{curr?.leave_type_id?.description}</Text>
                ) : (
                  ""
                )}
                {module == "leaveType" ? (
                  <Text fw={500}>{curr?.description}</Text>
                ) : (
                  ""
                )}
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-badge-down"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 13v-6l-5 4l-5 -4v6l5 4z" />
                    </svg>
                  </Menu.Target>

                  <Menu.Dropdown className="!w-[20%]  overflow-hidden">
                    <Menu.Item
                      className="w-full h-fit"
                      onClick={() => updateData(curr)}
                    >
                      Update
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              {module == "leavePolicies" ? (
                <Text size="sm" color="dimmed">
                  {curr?.max_leaves_per_year}
                </Text>
              ) : (
                ""
              )}
            </Card>
          </div>
        </>
      ))}
    </>
  );
};
