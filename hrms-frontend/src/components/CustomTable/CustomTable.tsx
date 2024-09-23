import { Avatar, Box, Flex, Table, Text } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

interface CustomTableProps<T> {
    data: T[]
    headingdata: string[]
}


const CustomTable = <T,>({ data, headingdata }: CustomTableProps<T>): JSX.Element => {
    const rows = data?.map((row: any) => (
        <Table.Tr key={row.name}>
            <Table.Td>
                <Flex gap="md" align="center">
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjhH9JE8PzTw1bAo66ZaAa9JVbj8gCfB2QA&s" alt="it's me" />
                    <Box>{row.name}</Box>
                </Flex>
            </Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>{row.designation}</Table.Td>
            <Table.Td><IconDotsVertical /></Table.Td>
        </Table.Tr>
    ))
    return (
        <Table verticalSpacing="md" layout="fixed" highlightOnHover withRowBorders>
            <Table.Tbody>
                <Table.Tr>
                    {headingdata?.map((element: any, index: any) => (
                        <Table.Th key={index}>
                            {element}
                        </Table.Th>
                    ))}
                </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
                {rows.length > 0 ? (
                    rows
                ) : (
                    <Table.Tr>
                        <Table.Td colSpan={3}>
                            <Text fw={500} ta="center">Nothing found</Text>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Tbody>
        </Table>
    )
}

export default CustomTable;