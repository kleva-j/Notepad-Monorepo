import AnimatedGradientText from "@/components/AnimatedGradientText";

import { BackgroundBeams } from "@/components/BackgroundBeam";
import { Input } from "@repo/ui/components/ui/input";

import { ChevronRight } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export default function Page() {
  return (
    <section className="relative h-screen w-screen flex justify-center bg-neutral-950">
      <div className="h-full w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4 flex flex-col gap-y-4">
          <div className="z-10 flex min-h-[6rem] items-center justify-center">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Notepad-GPT launching soon
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>

          <h1 className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center text-xl md:text-5xl">
            Join the waitlist for
            <span className="block mt-3 bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient text-lg md:text-7xl font-sans font-bold">
              Notepad-GPT
            </span>
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-base text-center relative z-10">
            Welcome to Notepad-GPT, the ultimate AI-powered audio summarizer,
            with a user-friendly interface, and a focus on privacy and security.
            Join our waitlist to get notified when we launch.
          </p>
          <Input
            type="email"
            placeholder="Enter Email Address"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
          />
        </div>
        <BackgroundBeams />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Waitlist",
  description: "Waitlist",
  openGraph: {
    title: "Waitlist",
    description: "Waitlist",
  },
};
