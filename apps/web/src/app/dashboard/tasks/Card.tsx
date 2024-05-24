import { BaseTaskProps } from "@/app/dashboard/tasks/data";
import { Card } from "@repo/ui/components/ui/card";
import { motion } from "framer-motion";

type CardProps = BaseTaskProps & {
  handleDragStart: (e: any, card: any) => void;
};

type DropIndicatorProps = { beforeId?: string } & Pick<BaseTaskProps, "column">;

const MotionCard = motion(Card);

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

export const KanbanCard = (props: CardProps) => {
  const { id, title, column, handleDragStart } = props;
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <MotionCard
        layout
        draggable
        layoutId={id}
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-700">{title}</p>
      </MotionCard>
    </>
  );
};
