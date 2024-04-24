import type { PropsWithChildren, ReactNode } from "react";

import { Nav } from "@/components/Nav";

type LayoutProps = PropsWithChildren & { header: ReactNode };

export default function Layout({ children, header }: LayoutProps) {
  return (
    <main className="flex w-full h-screen relative">
      <Nav />
      <section className="flex flex-col w-full ml-20 bg-neutral-200/50 dark:bg-neutral-900">
        {header}
        {children}
      </section>
    </main>
  );
}
