import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { LayoutWrapper } from "@/components/LayoutWrapper/LayoutWrapper";
import ReduxProvider from "@/services/reduxProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: { session?: any };
}>) {
  // const storeRef = useRef();
  // if (!storeRef.current) {
  //   storeRef.current = store();
  // }

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
            <LayoutWrapper session={pageProps?.session}>
              {children}
            </LayoutWrapper>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
