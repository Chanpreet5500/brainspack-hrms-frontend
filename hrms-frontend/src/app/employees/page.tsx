"use client";
import { useState } from 'react';
import {
    keys
} from '@mantine/core';
import Searchbar from '@/components/Searchbar/Searchbar';
import CustomTable from '@/components/CustomTable/CustomTable';
import { employeedata } from '@/constants/constants';

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



export default function Employees() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(employeedata);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setFilteredData(filterData(employeedata, value));
    };

    return (
        <>
            <div className='flex justify-between p-2 max-sm:flex-col-reverse'>
                <div>My Team ({employeedata.length})</div>
                <div className='w-[30%] max-sm:w-full'>
                    <Searchbar value={search} handleSearch={handleSearchChange} placeholder="Search" iconcolor='#9ca3af' classname='' />
                </div>
            </div>
            <CustomTable data={filteredData} headingdata={['Name', 'Email', 'Designation', '']} />
        </>
    );
}
