import { TypewriterEffectSmooth } from "@/components/TypewriterEffect";
import { Button } from "@repo/ui/components/ui/button";

import Link from "next/link";

const words2 = [
  { text: "AI-Powered" },
  { text: "Voice" },
  { text: "Note Taking", className: "text-amber-700 dark:text-amber-700" },
];

export const Hero = () => {
  return (
    <section className="h-[700px] grid place-items-center border-b-gray-100 border-[1px] bg-red-100">
      <div className="container py-8 mx-auto text-center flex flex-col justify-between items-center gap-y-2">
        <div className="relative flex gap-x-1 select-none items-center whitespace-nowrap rounded-full border-[0.5px] border-zinc-500 py-1.5 px-3 font-sans text-xs text-gray-500 w-max mx-auto">
          <span className="font-light">Powered by</span>
          <span className="font-bold text-amber-700">Together.ai</span>
          <span className="font-light">and</span>
          <span className="font-bold text-amber-700">Convex</span>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40" />
        </div>

        <TypewriterEffectSmooth words={words2} className="w-max" />

        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-xl max-w-2xl text-center">
          Notepad-GPT seamlessly converts your voice notes into organized summaries
          and clear action items using AI.
        </p>

        <Button asChild size="lg" className="text-lg rounded-full">
          <Link href="/console">Get started</Link>
        </Button>
      </div>
    </section>
  );
};
