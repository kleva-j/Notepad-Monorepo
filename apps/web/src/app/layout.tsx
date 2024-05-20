import "@repo/ui/globals.css";
import "./globals.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/Sonner";
import { Inter } from "next/font/google";

import ConvexClientProvider from "@/providers/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notepad-GPT",
  description: "AI-powered audio summarizer",
};

function RootLayout({ children }: Readonly<PropsWithChildren>): JSX.Element {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

export default RootLayout;
