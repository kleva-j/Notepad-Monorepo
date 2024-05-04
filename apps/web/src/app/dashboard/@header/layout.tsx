"use client";

import { type PropsWithChildren, useEffect } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@repo/ui/components/ui/button";
import { Dashboard, DashboardSearch } from "@/routes";
import { UserButton } from "@clerk/clerk-react";
import { usePush } from "@/routes/hooks";

import {
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
} from "@repo/ui/components/ui/breadcrumb";

export default function Layout({ children }: PropsWithChildren) {
  const goToSearch = usePush(DashboardSearch);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        goToSearch({});
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 bg-white dark:bg-neutral-900 dark:border-neutral-800 px-4 sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList className="sm:gap-1">
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Dashboard.Link>Dashboard</Dashboard.Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {children}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-x-4 ml-auto items-center">
        <Button
          variant="outline"
          className="focus-visible:ring-1 px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] font-normal shadow-none sm:pr-12 md:w-40 lg:w-64"
          asChild
        >
          <DashboardSearch.Link>
            <span className="hidden lg:inline-flex">
              Search tasks, notes...
            </span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>J
            </kbd>
          </DashboardSearch.Link>
        </Button>
        <Button className="rounded-full">
          <PlusIcon className="w-5 h-5 mr-2" />
          New Note
        </Button>
        <div className="relative flex items-center">
          <UserButton />
          <span className="absolute top-0 end-0 block size-2 rounded-full ring-2 ring-white bg-amber-500 dark:ring-neutral-900"></span>
        </div>
      </div>
    </header>
  );
}
