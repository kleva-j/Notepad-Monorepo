"use client";

import { Button } from "@repo/ui/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/icons/Logo";

import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";

export const Header = () => {
  return (
    <header className="relative w-full py-7">
      <div className="container flex flex-wrap items-center justify-between shrink-0 group">
        <Logo />

        <div className="flex flex-row gap-x-4">
          <Authenticated>
            <Button className="rounded-full" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </Authenticated>

          <Unauthenticated>
            <Button className="rounded-full" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </Unauthenticated>

          <ModeToggle variant="ghost" className="rounded-full" />
        </div>
      </div>
    </header>
  );
};
