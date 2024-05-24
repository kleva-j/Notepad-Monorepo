"use client";

import type { BaseTaskProps } from "@/app/dashboard/tasks/data";

import { Card } from "@repo/ui/components/ui/card";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export const KanbanCard = (props: BaseTaskProps) => {
  const { id, title, column } = props;

  return (
    <>
      <div
        data-before={id || "-1"}
        data-column={column}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      />
      <MotionCard
        layout
        draggable
        layoutId={id}
        className="cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-700">{title}</p>
      </MotionCard>
    </>
  );
};
