"use client";

import { useDisclosure } from "@mantine/hooks";
import { AppShell, Flex } from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { usePathname } from "next/navigation";
import { NavbarNested } from "../Sidebar/NavbarNested";
import MySidebar from "../Sidebar/mySidebar";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authorizedUser/authorizedUser";
import { useEffect } from "react";

export function LayoutWrapper({
  authUser,
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isRegisterPage = pathname !== "/";
  useEffect(() => {
    dispatch(setAuthUser(authUser));
  }, [authUser])
  return (
    <>
      {isRegisterPage ? (
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

          <AppShell.Navbar style={{ backgroundColor: "#e8ecef" }}>
            <Sidebar />
          </AppShell.Navbar>
          <AppShell.Main style={{ backgroundColor: "#e8ecef" }}>
            {children}
          </AppShell.Main>
        </AppShell>
      ) : <>{children}</>}
    </>
  );
}
