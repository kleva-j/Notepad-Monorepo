"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@repo/ui/components/ui/button";
import { Home, Dashboard, Signin } from "@/routes";

import Image from "next/image";

export const Header = () => {
  return (
    <header className="relative w-full py-6">
      <div className="container flex flex-wrap items-center justify-between shrink-0 group">
        <Home.Link className="flex items-center">
          <Image height={30} width={30} src="/logo-white-256x256.png" alt="Vercel Logo" />
          <span className="ml-2 text-[22px] leading-[30px] font-semibold">Notepad-GPT</span>
        </Home.Link>

        <div className="flex flex-row gap-x-4">
          <Authenticated>
            <Button className="rounded-full" size="sm" asChild>
              <Dashboard.Link>Go to Dashboard</Dashboard.Link>
            </Button>
          </Authenticated>
          <Unauthenticated>
            <Button className="rounded-full" size="sm" asChild>
              <Signin.Link>Sign In</Signin.Link>
            </Button>
          </Unauthenticated>
        </div>
      </div>
    </header>
  );
};
