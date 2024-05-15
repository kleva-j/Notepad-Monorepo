"use client";

import type { BaseTaskProps } from "@/app/dashboard/tasks/KanbanColumn";

import { Column } from "@/app/dashboard/tasks/KanbanColumn";
import { DEFAULT_CARDS } from "@/app/dashboard/tasks/data";
import { useState } from "react";

interface IKanbanColumn {
  backlog: BaseTaskProps[];
  todo: BaseTaskProps[];
  doing: BaseTaskProps[];
  done: BaseTaskProps[];
}

const kanbanColumn: IKanbanColumn = {
  backlog: [],
  todo: [],
  doing: [],
  done: [],
};

const cardsByColumn: IKanbanColumn = DEFAULT_CARDS.reduce((acc, card) => {
  acc[card.column as keyof IKanbanColumn].push(card);
  return acc;
}, kanbanColumn);

export const KanbanBoard = () => {
  const [, setCards] = useState<BaseTaskProps[]>(DEFAULT_CARDS);

  const { todo, doing, done, backlog } = cardsByColumn;

  return (
    <div className="border rounded-sm">
      <div className="flex h-full w-full gap-y-3 gap-x-4 overflow-scroll p-8">
        <Column
          title="Backlog"
          column="backlog"
          headingColor="text-neutral-500"
          cards={backlog}
          setCards={setCards}
        />
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-500"
          cards={todo}
          setCards={setCards}
        />
        <Column
          title="In progress"
          column="doing"
          headingColor="text-blue-500"
          cards={doing}
          setCards={setCards}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-500"
          cards={done}
          setCards={setCards}
        />
      </div>
    </div>
  );
};
