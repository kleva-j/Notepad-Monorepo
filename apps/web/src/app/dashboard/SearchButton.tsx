"use client";

import { Button } from "@repo/ui/components/ui/button";
import { SearchBox } from "@/app/dashboard/SearchBox";
import { useEffect, useState } from "react";

export const SearchButton = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpenChange = () => setOpen(!isOpen);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="focus-visible:ring-1 px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] font-normal shadow-none sm:pr-12 md:w-40 lg:w-64 text-gray-700"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search tasks, notes...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <SearchBox isOpen={isOpen} handleClose={handleOpenChange} />
    </>
  );
};
