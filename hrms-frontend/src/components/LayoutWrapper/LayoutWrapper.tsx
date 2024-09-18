'use client';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Flex, } from '@mantine/core';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <AppShell
                header={{ height: { base: 60, md: 60, lg: 70 } }}
                navbar={{
                    width: { base: 100, md: 200, lg: 240 },
                    breakpoint: 'md',
                    collapsed: { mobile: !opened },
                }}
                padding="md"

            >
                <AppShell.Header style={{ backgroundColor: '#e8ecef' }}>
                    <Flex h="100%" px="md" style={{ width: '100%' }} align="center">
                        <Navbar opened={opened} toggle={toggle} />
                    </Flex>
                </AppShell.Header>

                <AppShell.Navbar p="md" style={{ backgroundColor: '#e8ecef' }}>
                    <Sidebar />
                </AppShell.Navbar>
                <AppShell.Main style={{ backgroundColor: '#e8ecef' }}>
                    <main>
                        {children}
                    </main>
                </AppShell.Main>
            </AppShell>
        </>
    );
}

