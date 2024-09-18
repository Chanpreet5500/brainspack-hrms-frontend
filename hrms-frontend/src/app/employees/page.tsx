"use client";
import { useState } from 'react';
import {
    Table,
    Text,
    Avatar,
    Flex,
    Box,
    keys
} from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import Searchbar from '@/components/Searchbar/Searchbar';

interface RowData {
    name: string;
    email: string;
    designation: string;
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

const data = [
    { name: 'Athena Weissnat', designation: 'Little - Rippin', email: 'Elouise.Prohaska@yahoo.com' },
    { name: 'Deangelo Runolfsson', designation: 'Greenfelder - Krajcik', email: 'Kadin_Trantow87@yahoo.com' },
    { name: 'Danny Carter', designation: 'Kohler and Sons', email: 'Marina3@hotmail.com' },
];

export default function Employees() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setFilteredData(filterData(data, value));
    };

    const rows = filteredData.map((row) => (
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
    ));

    return (
        <>
            <div className='flex justify-between p-2 max-sm:flex-col-reverse'>
                <div>My Team ({data.length})</div>
                <div className='w-[30%] max-sm:w-full'>
                    <Searchbar value={search} handleSearch={handleSearchChange} placeholder="Search" iconcolor='#9ca3af' classname='' />
                </div>
            </div>
            <Table verticalSpacing="md" layout="fixed" highlightOnHover withRowBorders>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Designation</Table.Th>
                        <Table.Th></Table.Th>
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
        </>
    );
}
