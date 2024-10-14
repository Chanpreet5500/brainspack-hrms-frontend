"use client";

import { useDisclosure } from "@mantine/hooks";
import { AppShell, Flex } from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { SessionProvider } from "next-auth/react";

export function LayoutWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      <AppShell
        header={{ height: { base: 60, md: 60, lg: 80 } }}
        navbar={{
          width: { base: 100, md: 200, lg: 220 },
          breakpoint: "md",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header style={{ backgroundColor: "#e8ecef" }}>
          <Flex px="md" style={{ width: "100%" }} align="center">
            <Navbar opened={opened} toggle={toggle} />
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar p="md" style={{ backgroundColor: "#e8ecef" }}>
          <Sidebar toggle={toggle} />
        </AppShell.Navbar>
        <AppShell.Main style={{ backgroundColor: "#e8ecef" }}>
          {children}
        </AppShell.Main>
      </AppShell>
    </SessionProvider>
  );
}
