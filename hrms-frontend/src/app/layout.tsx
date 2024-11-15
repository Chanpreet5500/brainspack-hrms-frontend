import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { LayoutWrapper } from "@/components/LayoutWrapper/LayoutWrapper";
import ReduxProvider from "@/services/reduxProvider";
import { SessionProviderWrapper } from "@/components/session/SessionProviderWrapper";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

import React from "react";

const inter = Inter({ subsets: ["latin"] });
type SessionType = {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  expires: string;
} | null;

export const metadata: Metadata = {
  title: "Brainspack | HRMS",
  description:
    "A modern, web-based Human Resource Management System (HRMS) designed to streamline employee management, leave tracking, and attendance monitoring with seamless authentication and powerful reporting features.",
};

type PageProps = {
  session?: SessionType;
};

export default async function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: PageProps;
}) {
  const session = pageProps?.session;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Brainspack:HRMS</title>
        <ColorSchemeScript />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <MantineProvider>
            <SessionProviderWrapper session={session}>
              <Notifications />
              <LayoutWrapper>{children}</LayoutWrapper>
            </SessionProviderWrapper>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
