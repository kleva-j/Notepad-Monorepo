import { getCardByColumn } from "@/app/dashboard/tasks/data";
import { Column } from "@/app/dashboard/tasks/KanbanColumn";

const { todo, doing, done, backlog } = getCardByColumn();

export const KanbanBoard = () => {
  return (
    <div className="border rounded-sm">
      <div className="flex h-full w-full gap-y-3 gap-x-4 overflow-scroll p-8">
        <Column
          cards={backlog}
          title="Backlog"
          column="backlog"
          setCards={() => {}}
          headingColor="text-neutral-500"
          />
        <Column
          cards={todo}
          title="TODO"
          column="todo"
          setCards={() => {}}
          headingColor="text-yellow-500"
        />
        <Column
          cards={doing}
          column="doing"
          title="In progress"
          setCards={() => {}}
          headingColor="text-blue-500"
        />
        <Column
          cards={done}
          column="done"
          title="Complete"
          setCards={() => {}}
          headingColor="text-emerald-500"
        />
      </div>
    </div>
  );
};
