import type { Task } from "@/tasks/data"; 

import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "@repo/ui/lib/utils";

type ListCardProps = {
  task: Task;
  checked: boolean;
  handleClick: () => void;
  onCheckChange: (id: string) => void;
};

export const ListCard = (props: ListCardProps) => {
  const { task, onCheckChange } = props;
  const { id, title, status, priority, createdAt } = task;

  const formatted = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <TableRow
      onClick={() => props.handleClick()}
      className="cursor-pointer"
      {...props}
    >
      <TableCell>
        <Checkbox
          checked={props.checked}
          onCheckedChange={() => onCheckChange(id)}
          className="relative top-[2px]"
        />
      </TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "text-xs text-[11px] py-[1px] px-2 capitalize font-normal",
            {
              "text-amber-600": status === "pending",
              "text-sky-600": status === "doing",
              "text-emerald-600": status === "done",
            }
          )}
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell
        className={cn("text-[10px] uppercase", {
          "text-rose-500 ": priority === "urgent",
          "text-cyan-500 ": priority === "normal",
          "text-slate-500": priority === "low",
        })}
      >
        {priority}
      </TableCell>
      <TableCell className="text-sm text-gray-700 dark:text-gray-400">
        {formatted}
      </TableCell>
    </TableRow>
  );
};
