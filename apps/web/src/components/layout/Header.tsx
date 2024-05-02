"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@repo/ui/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/icons/Logo";
import { Dashboard, Signin } from "@/routes";

export const Header = () => {
  return (
    <header className="relative w-full py-7">
      <div className="container flex flex-wrap items-center justify-between shrink-0 group">
        <Logo />

        <div className="flex flex-row gap-x-4">
          <Authenticated>
            <Button className="rounded-full" asChild>
              <Dashboard.Link >Dashboard</Dashboard.Link>
            </Button>
          </Authenticated>

          <Unauthenticated>
            <Button className="rounded-full" asChild>
              <Signin.Link >Sign In</Signin.Link>
            </Button>
          </Unauthenticated>

          <ModeToggle variant="ghost" className="rounded-full" />
        </div>
      </div>
    </header>
  );
};
