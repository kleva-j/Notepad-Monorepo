import { TableCell, TableRow } from "@repo/ui/components/ui/table";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Badge } from "@repo/ui/components/ui/badge";
import { TableTask } from "@/tasks/TableColumn";
import { cn } from "@repo/ui/lib/utils";

type ListCardProps = TableTask & {
  checked: boolean;
  onCheckChange: (id: string) => void;
};

export const ListCard = (props: ListCardProps) => {
  const { id, title, status, priority, createdAt, onCheckChange } = props;

  const date = new Date(createdAt);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <TableRow>
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
      <TableCell className="text-sm text-gray-700 dark:text-gray-400">{formatted}</TableCell>
    </TableRow>
  );
};
