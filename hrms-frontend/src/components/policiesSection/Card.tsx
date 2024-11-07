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
          <div className="w-full md:w-[22%] rounded-2xl p-5 flex h-[200px] bg-gray-200 justify-center items-center shadow-lg transition-transform transform hover:scale-105">
            <Card
              className="shadow-md p-lg rounded-2xl h-[150px] w-full flex flex-col justify-between bg-white"
              withBorder
            >
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={600} className="text-lg text-gray-800">
                  {curr?.leave_type_id?.description}
                </Text>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icon-tabler-dots-horizontal cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <circle cx="6" cy="12" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="18" cy="12" r="1" />
                    </svg>
                  </Menu.Target>

                  <Menu.Dropdown className="!w-[5%] overflow-hidden">
                    <Menu.Item
                      className="w-full h-fit hover:bg-gray-200 transition-colors"
                      onClick={() => updateData(curr)}
                    >
                      Update
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Text size="sm" className="text-gray-500 mb-2">
                {curr?.max_leaves_per_year}
              </Text>
            </Card>
          </div>
        </>
      ))}
    </>
  );
};
