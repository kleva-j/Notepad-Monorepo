import type { Task } from "@/types/tasks";

import { ChevronsUpDown, Calendar } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";
import { priorities } from "@/lib/constant";
import { cn } from "@repo/ui/lib/utils";

import {
  TableBody,
  TableCell,
  TableRow,
  Table,
} from "@repo/ui/components/ui/table";

export function TaskDetails({ task }: { task: Task }) {
  const { title, description, status, priority, noteId, dueDate } = task;

  const Icon =
    priorities.find((p) => p.value === priority)?.icon2 || ChevronsUpDown;

  const formatedDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col justify-center">
      <div
        className={cn(
          "text-[11px] flex items-center uppercase h-10 font-medium tracking-wide",
          {
            "text-red-500 ": priority === "urgent",
            "text-cyan-500 ": priority === "normal",
            "text-slate-500": priority === "low",
          }
        )}
      >
        <Icon className="h-4 w-4 mr-2" />
        <span className="">{priority} Priority</span>
      </div>

      <div className="flex flex-col items-start justify-center gap-y-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-sm font-normal text-slate-400 dark:text-neutral-400 mb-2">
          {description}
        </p>

        <Table>
          <TableBody>
            <TableRow className="border-transparent hover:bg-transparent h-8">
              <TableCell className="text-sm font-normal text-slate-500 dark:text-neutral-400 p-0">
                Record/Note ID
              </TableCell>
              <TableCell className="p-0">{noteId}</TableCell>
            </TableRow>

            {dueDate && (
              <TableRow className="border-transparent hover:bg-transparent h-8">
                <TableCell className="text-sm font-normal text-slate-500 dark:text-neutral-400 p-0">
                  Due Date
                </TableCell>
                <TableCell className="p-0 h-8 flex items-center text-slate-500 dark:text-neutral-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <p className="text-sm">{formatedDate}</p>
                </TableCell>
              </TableRow>
            )}

            <TableRow className="border-transparent hover:bg-transparent h-8">
              <TableCell className="text-sm font-normal text-slate-500 dark:text-neutral-400 p-0">
                Status
              </TableCell>
              <TableCell className="p-0">
                <Badge
                  className={cn("text-xs font-normal capitalize", {
                    "text-amber-600 bg-amber-50": status === "pending",
                    "text-sky-600 bg-sky-50": status === "doing",
                    "text-emerald-600 bg-emerald-50": status === "done",
                  })}
                >
                  {status}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
