import React from "react";
import type { Metadata } from "next";
import ReduxProvider from "@/services/reduxProvider";
import { Notifications } from "@mantine/notifications";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import { LayoutWrapper } from "@/components/LayoutWrapper/LayoutWrapper";
import { SessionProviderWrapper } from "@/components/session/SessionProviderWrapper";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Brainspack | HRMS",
  description:
    "A modern, web-based Human Resource Management System (HRMS) designed to streamline employee management, leave tracking, and attendance monitoring with seamless authentication and powerful reporting features.",
};

export default async function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: { session?: any };
}>) {
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
            <SessionProviderWrapper session={pageProps?.session}>
              <Notifications />
              <LayoutWrapper>{children}</LayoutWrapper>
            </SessionProviderWrapper>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
