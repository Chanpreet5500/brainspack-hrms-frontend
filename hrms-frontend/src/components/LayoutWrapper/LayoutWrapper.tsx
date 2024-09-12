'use client';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Autocomplete, Avatar, Box, Burger, Flex, Group, rem } from '@mantine/core';
import { useState } from 'react';
import { NavbarNested } from '../navbar/NavbarNested';
import { Logo } from '../navbar/Logo';
import { IconSearch } from '@tabler/icons-react';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <AppShell
                header={{ height: { base: 60, md: 70, lg: 80 } }}
                navbar={{
                    width: { base: 100, md: 200, lg: 300 },
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Flex h="100%" px="md" style={{ width: '100%' }} align="center">
                        <Flex style={{ width: '20%' }}>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                            {/* <Logo style={{ width: rem(120) }} /> */}
                            <h2>HRMS</h2>
                        </Flex>
                        <Box style={{ width: '80%' }}>
                            <Flex
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
                            </Flex>
                        </Box>

                    </Flex>
                </AppShell.Header>

                <AppShell.Navbar p="md" style={{}}>
                    <NavbarNested />
                </AppShell.Navbar>
                <AppShell.Main>
                    <main>
                        {children}
                    </main>
                </AppShell.Main>
            </AppShell>
        </>
    );
}

