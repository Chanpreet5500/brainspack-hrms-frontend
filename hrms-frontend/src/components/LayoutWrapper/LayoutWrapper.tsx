'use client';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Autocomplete, Avatar, Box, Burger, Flex, Group, rem } from '@mantine/core';
import { useState } from 'react';
import { NavbarNested } from '../navbar/NavbarNested';
import { Logo } from '../navbar/Logo';
import { IconSearch } from '@tabler/icons-react';
import NewNavbar from '../NewNavbar/NewNavbar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <AppShell
                header={{ height: { base: 60, md: 70, lg: 200 }     }}
                navbar={{
                    width: 0,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="md"
                style={{ backgroundColor: '#e8ecef' }}
            >
                <AppShell.Header style={{ backgroundColor: '#e8ecef' }}>
                    <Flex h="100%" px="md" style={{ width: '100%' }} align="center">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                       
                        <NewNavbar />

                    </Flex>
                </AppShell.Header>

                <AppShell.Navbar  style={{}}>
                </AppShell.Navbar>
                <AppShell.Main class='w-full'>
                    <main>
                        {children}
                    </main>
                </AppShell.Main>
            </AppShell>
        </>
    );
}

