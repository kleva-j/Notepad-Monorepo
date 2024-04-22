import type { PropsWithChildren } from "react";

import { Nav } from "@/components/Nav";

export function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex w-full h-screen relative">
      <Nav />
      <section className="flex flex-col w-full ml-20 gap-5 dark:bg-neutral-900">
        {children}
      </section>
    </main>
  );
}
