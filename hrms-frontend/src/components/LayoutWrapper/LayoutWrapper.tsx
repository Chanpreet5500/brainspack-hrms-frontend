"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthToken,
  setAuthUser,
} from "@/redux/authorizedUser/authorizedUser";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { AppShell, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "../../containers/Sidebar/Sidebar";
import Navbar from "../../containers/Navbar/Navbar";
import { usePathname } from "next/navigation";
import jwt from "jsonwebtoken";
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isRegisterPage = pathname !== "/";
  const { authToken } = useSelector(manageAuthUserSelector);

  useEffect(() => {
    if (
      status == "authenticated" &&
      session.apiAccessToken &&
      authToken === null
    ) {
      dispatch(setAuthToken(session?.apiAccessToken));
      const decodedToken = jwt.decode(session.apiAccessToken);
      dispatch(setAuthUser(decodedToken));
    }
  }, [status]);

  return (
    <>
      {isRegisterPage ? (
        <AppShell
          header={{ height: { base: 60, md: 60, lg: 80 } }}
          navbar={{
            width: { base: 100, md: 200, lg: 320 },
            breakpoint: "md",
            collapsed: { mobile: !opened },
          }}
        >
          <AppShell.Header style={{ backgroundColor: "white" }}>
            <Flex px="md" style={{ width: "100%" }} align="center">
              <Navbar opened={opened} toggle={toggle} />
            </Flex>
          </AppShell.Header>
          <AppShell.Navbar style={{ backgroundColor: "white" }}>
            <Sidebar toggleSidebar={toggle} />
          </AppShell.Navbar>
          <AppShell.Main style={{ backgroundColor: "white" }}>
            {children}
          </AppShell.Main>
        </AppShell>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
