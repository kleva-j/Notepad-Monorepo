"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { TypewriterEffectSmooth } from "@/components/TypewriterEffect";
import { Button } from "@repo/ui/components/ui/button";
import { BorderBeam } from "@/components/BorderBeam";
import { Dashboard, Signin } from "@/routes";
import { ChevronRight } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

import AnimatedGradientText from "@/components/AnimatedGradientText";
import Image from "next/image";

const words2 = [
  { text: "AI-Powered" },
  { text: "Voice" },
  { text: "Note Taking", className: "text-amber-700 dark:text-teal-500" },
];

export const Hero = () => {
  return (
    <section className="h-[calc(100vh-6rem)] overflow-hidden">
      <div className="container py-8 mx-auto text-center flex flex-col justify-between items-center gap-y-1.5">
        <div className="z-1 flex min-h-[4rem] items-center justify-center">
          <AnimatedGradientText>
            🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Powered by
              <a
                href="https://www.together.ai/"
                className="text-amber-700 dark:text-teal-500 mx-1.5 hover:underline"
                target="_blank"
              >
                Together.ai
              </a>
              <span className="font-light">and</span>
              <a
                className="text-amber-700 dark:text-teal-500 mx-1.5 hover:underline"
                href="https://www.convex.dev/"
                target="_blank"
              >
                Convex
              </a>
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </div>

        <TypewriterEffectSmooth words={words2} className="w-max" />

        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-xl max-w-2xl text-center">
          Notepad-GPT seamlessly converts your voice notes into organized
          summaries and clear action items using AI.
        </p>
        <Authenticated>
          <Button size="lg" className="text-lg rounded-full">
            <Dashboard.Link>Dashboard</Dashboard.Link>
          </Button>
        </Authenticated>

        <Unauthenticated>
          <Button
            size="lg"
            className="text-lg rounded-full transition-all duration-300 hover:ring-2 hover:ring-teal-50 hover:ring-offset-2"
          >
            <Signin.Link>Get started</Signin.Link>
          </Button>
        </Unauthenticated>

        <AuthLoading>
          <Button
            size="lg"
            className="text-lg rounded-full transition-all duration-300 hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
            disabled
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Please wait
          </Button>
        </AuthLoading>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2rem]">
        <div className="relative h-full w-full rounded-xl overflow-hidden">
          <BorderBeam />
          <Image
            height={960}
            width={800}
            src="/notepad-gpt.png"
            alt="Banner image"
          />
        </div>
      </div>
    </section>
  );
};
