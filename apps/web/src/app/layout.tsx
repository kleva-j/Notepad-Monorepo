import "@repo/ui/globals.css";
import "./globals.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { ViewTransitions } from "next-view-transitions";
import { fontMono, fontSans } from "@/lib/fonts";
import { Toaster } from "@/components/Sonner";
import { cn } from "@repo/ui/lib/utils";
import { Provider } from "jotai";

import ConvexClientProvider from "@/providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Notepad-GPT",
  description: "AI-powered audio summarizer",
};

function RootLayout({ children }: Readonly<PropsWithChildren>): JSX.Element {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Provider>
            <ThemeProvider
              disableTransitionOnChange
              defaultTheme="system"
              attribute="class"
              enableSystem
            >
              <ConvexClientProvider>{children}</ConvexClientProvider>
              <Toaster />
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </ViewTransitions>
  );
}

export default RootLayout;
