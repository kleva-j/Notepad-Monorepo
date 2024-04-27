"use client";

import type { PropsWithChildren } from "react";

import { BreadcrumbList, Breadcrumb } from "@repo/ui/components/ui/breadcrumb";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@repo/ui/components/ui/button";
import { UserButton } from "@clerk/clerk-react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 bg-white dark:bg-neutral-900 dark:border-neutral-800 px-4 sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList className="sm:gap-1">{children}</BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-x-4 ml-auto">
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
