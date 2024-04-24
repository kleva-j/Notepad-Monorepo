"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { TypewriterEffectSmooth } from "@/components/TypewriterEffect";
import { Button } from "@repo/ui/components/ui/button";

import Link from "next/link";

const words2 = [
  { text: "AI-Powered" },
  { text: "Voice" },
  { text: "Note Taking", className: "text-amber-700 dark:text-teal-500" },
];

export const Hero = () => {
  return (
    <section className="h-[700px] grid place-items-center">
      <div className="container py-8 mx-auto text-center flex flex-col justify-between items-center gap-y-2">
        <div className="relative flex gap-x-1 select-none items-center whitespace-nowrap rounded-full border-[0.5px] border-zinc-500 py-1.5 px-3 font-sans text-xs text-gray-500 w-max mx-auto">
          <span className="font-light">Powered by</span>
          <span className="font-bold text-amber-700 dark:text-teal-500">Together.ai</span>
          <span className="font-light">and</span>
          <span className="font-bold text-amber-700 dark:text-teal-500">Convex</span>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40" />
        </div>

        <TypewriterEffectSmooth words={words2} className="w-max" />

        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-xl max-w-2xl text-center">
          Notepad-GPT seamlessly converts your voice notes into organized
          summaries and clear action items using AI.
        </p>
        <Authenticated>
          <Button size="lg" className="text-lg rounded-full">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </Authenticated>

        <Unauthenticated>
          <Button size="lg" className="text-lg rounded-full">
            <Link href="/sign-in">Get started</Link>
          </Button>
        </Unauthenticated>

        <AuthLoading>
          <Button size="lg" className="text-lg rounded-full" disabled>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
    </section>
  );
};
