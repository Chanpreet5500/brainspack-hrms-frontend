"use client"
import { NavbarNested } from "@/components/navbar/NavbarNested";
import { Autocomplete, Avatar, Box, Flex, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Employees = () => {
    return (
        <>
            {/* <Flex
                justify="space-between"
                align="center"
                style={{ padding: rem(16) }}
            >
                <Autocomplete
                    placeholder="Search"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                    style={{ width: '70%' }}
                />

                <Avatar src={null} alt="no image here" radius="xl" />
            </Flex> */}
            <p>This is the employee table </p>
        </>
    )
}

export default Employees;