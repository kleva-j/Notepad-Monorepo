"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@repo/ui/components/ui/button";
import { Home, Dashboard, Signin } from "@/routes";
import { ModeToggle } from "../ModeToggle";


import Image from "next/image";

export const Header = () => {
  return (
    <header className="relative w-full py-8">
      <div className="container flex flex-wrap items-center justify-between shrink-0 group">
        <Home.Link className="flex items-center">
          <Image height={32} width={32} src="/logo-white-256x256.png" alt="Vercel Logo" />
          <span className="ml-2 text-2xl font-semibold">Notepad-GPT</span>
        </Home.Link>

        <div className="flex flex-row gap-x-4">
          <Authenticated>
            <Button className="rounded-full" asChild>
              <Dashboard.Link>Go to Dashboard</Dashboard.Link>
            </Button>
          </Authenticated>
          <Unauthenticated>
            <Button className="rounded-full" asChild>
              <Signin.Link>Sign In</Signin.Link>
            </Button>
          </Unauthenticated>

          {/* <ModeToggle variant="ghost" className="rounded-full" /> */}
        </div>
      </div>
    </header>
  );
};
