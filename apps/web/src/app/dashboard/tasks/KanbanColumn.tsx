import type { Dispatch, SetStateAction } from "react";

import { KanbanCard } from "@/app/dashboard/tasks/Card";
import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "@repo/ui/lib/utils";

export type BaseTaskProps = {
  id: string;
  title: string;
  column: string;
};

type ColumnProps = {
  title: string;
  column: string;
  cards: any[];
  setCards: Dispatch<SetStateAction<any[]>>;
  headingColor: string;
};

export const Column = (props: ColumnProps) => {
  const { title, column, cards, setCards, headingColor } = props;

  return (
    <div className="flex shrink-0 w-64 flex-col">
      <div className="mb-3 flex items-center w-full justify-between">
        <h3 className={cn("font-medium", headingColor)}>{title}</h3>
        <Badge variant="outline">{cards.length}</Badge>
      </div>
      <div className="border-teal-400">
        <ul className="flex flex-col gap-y-0.5">
          {cards.map((card: any) => (
            <KanbanCard
              id={card.id}
              key={card.id}
              column={column}
              title={card.title}
              handleDragStart={() => setCards(cards)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
