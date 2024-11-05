"use client";

import { useDisclosure } from "@mantine/hooks";
import { AppShell, Flex } from "@mantine/core";
import Sidebar from "../../containers/Sidebar/Sidebar";
import Navbar from "../../containers/Navbar/Navbar";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setauthorized,
  setAuthToken,
  setAuthUser,
} from "@/redux/authorizedUser/authorizedUser";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { notifications } from "@mantine/notifications";

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isRegisterPage = pathname !== "/";
  const { authToken } = useSelector(manageAuthUserSelector);
  useEffect(() => {
    if (status === "authenticated" && session) {
      if (session && session?.apiAccessToken && authToken === null) {
        dispatch(setAuthToken(session?.apiAccessToken));
        try {
          const decodedToken = jwt.decode(session.apiAccessToken);
          if (decodedToken) {
            dispatch(setAuthUser(decodedToken));
          } else {
            console.error("Failed to decode token");
          }
        } catch (err) {
          console.log("error in decoding the code", err);
        }
      } else {
        if (!session?.apiAccessToken) {
          signOut();
          notifications.show({
            color: "red",
            title: "Access Denied",
            message: "Please register yourself to Sign In",
          });
          dispatch(setauthorized(false))
        }
      }
    }
  }, [status, session]);
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
          <AppShell.Header style={{ backgroundColor: "white" }}>
            <Flex px="md" style={{ width: "100%" }} align="center">
              <Navbar opened={opened} toggle={toggle} />
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar style={{ backgroundColor: "white" }}>
            <Sidebar />
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
