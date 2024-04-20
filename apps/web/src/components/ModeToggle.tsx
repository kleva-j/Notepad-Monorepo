"use client";

import { Button } from "@repo/ui/components/ui/button";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import { cn } from "@repo/ui/lib/utils";
import { useTheme } from "next-themes";

type Props = { className?: string };

export function ModeToggle({ className }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      className={cn(className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
