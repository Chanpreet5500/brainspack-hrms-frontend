import { getLabelByValue } from "@/constants/commonFunction";
import { employeeDepartment, employeProfetion } from "@/constants/constants";
import { Avatar, Box, Button, Flex, Table, Text } from "@mantine/core";
import { IconDotsVertical, IconCheck, IconBan, IconThumbUpFilled, IconThumbUp, IconThumbDown } from '@tabler/icons-react';

interface CustomTableProps<T> {
  data: T[];
  headingdata: string[];
  showConfirmRejectButton: boolean;
  showDotIcon: boolean;
  opened?: any;
  form?: any;
  action1?: any
  ActionContent?: any
  editModal?: any
}

const CustomTable = <T,>({
  data,
  headingdata,
  showConfirmRejectButton,
  showDotIcon,
  opened,
  form,
  action1,
  editModal,
  ActionContent,
}: CustomTableProps<T>): JSX.Element => {
  // const editModal = (row: any) => {
  //   opened();
  //   form.setValues(row);
  // };

  const rows = data?.map((row: any, index: any) => (
    <Table.Tr key={row.name}>
      <Table.Td>{index + 1}</Table.Td>
      {Object.keys(row).map((key, index) => (
        <Table.Td key={index}>
          {key === "fname" ? (
            <Flex gap="md" align="center">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjhH9JE8PzTw1bAo66ZaAa9JVbj8gCfB2QA&s"
                alt="it's me"
              />
              <Box>{row[key]}</Box>
            </Flex>
          ) : key === "role" ? (
            getLabelByValue(row[key], employeProfetion)
          ) : key === "department" ? (
            getLabelByValue(row[key], employeeDepartment)
          ) : (
            row[key]
          )}
        </Table.Td>
      ))}
      {showDotIcon && (
        <Table.Td>
          <IconDotsVertical />
        </Table.Td>
      )}
      {showConfirmRejectButton && (
        <Table.Td>
          {ActionContent && <ActionContent row={row} editModal={editModal} />}
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table verticalSpacing="md" highlightOnHover withRowBorders>
      <Table.Tbody>
        <Table.Tr>
          {headingdata?.map((element: any, index: any) => (
            <Table.Th key={index}>{element}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Tbody>
      <Table.Tbody>
        {rows?.length > 0 ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Td colSpan={3}>
              <Text fw={500} ta="center">
                Nothing found
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export default CustomTable;