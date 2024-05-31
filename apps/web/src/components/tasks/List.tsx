import { Input } from "@repo/ui/components/ui/input";
import { getTableDataByColumn } from "@/tasks/data";
import { ListColumn } from "@/tasks/ListColumn";

const { todo, completed, backlog, ...rest } = getTableDataByColumn();

export function ListView() {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center">
        <Input placeholder="Filter titles..." className="max-w-[300px]" />
      </div>
      <div className="flex flex-col gap-y-6 overflow-y-auto">
        <ListColumn title="Backlog" tasks={backlog} />
        <ListColumn title="To-do" tasks={todo} accentColor="bg-sky-500" />
        <ListColumn
          title="In Progress"
          tasks={rest["in progress"]}
          accentColor="bg-amber-500"
        />
        <ListColumn
          title="Completed"
          tasks={completed}
          accentColor="bg-green-500"
        />
      </div>
    </div>
  );
}
