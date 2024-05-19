import "./globals.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notepad Docs",
  description: "Notepad documentation",
};

function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
