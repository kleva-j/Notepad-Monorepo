import type { PropsWithChildren, ReactNode } from "react";

import { cn } from "@repo/ui/lib/utils";

export type BentoGridProps = PropsWithChildren & { className?: string };

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export type BentoGridItemProps = {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
};

export const BentoGridItem = (props: BentoGridItemProps) => {
  const { className, title, description, header, icon } = props;
  return (
    <div
      className={cn(
        "row-span-1 rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-neutral-950/20 dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans text-xl font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
