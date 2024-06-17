"use client";

import type { Task } from "@/tasks/data";

import { TaskDetails } from "@/components/tasks/TaskDetails";
import { ListColumn } from "@/components/tasks/ListColumn";
import { Toggle } from "@repo/ui/components/ui/toggle";
import { Input } from "@repo/ui/components/ui/input";
import { useMediaQuery } from "usehooks-ts";
import { IListColumn } from "@/tasks/data";
import { CheckCheck } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";

import {
  DialogContent,
  DialogHeader,
  Dialog,
} from "@repo/ui/components/ui/dialog";
import {
  DrawerContent,
  DrawerHeader,
  Drawer,
} from "@repo/ui/components/ui/drawer";

type ColumnGroupProps = {
  data: Omit<IListColumn, "in progress"> & { inProgress: Task[] };
};

export function ListColumnGroup({ data }: ColumnGroupProps) {
  const { backlog, todo, completed: done, inProgress } = data;
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [showDetails, setShowDetails] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const completed = selectedTask?.completedAt ? 1 : 0;

  const ToggleButton = (
    <Toggle
      size="sm"
      variant="outline"
      aria-label="Mark as complete"
      className={cn("max-w-[200px] text-[13px] text-slate-500", {
        "data-[state=on]:text-emerald-500 border-emerald-200 data-[state=on]:bg-emerald-50/30":
          completed,
      })}
      defaultChecked={!!completed}
      value={completed}
      onClick={() => {
        if (selectedTask) {
          setSelectedTask({
            ...selectedTask,
            completedAt: completed ? null : new Date().toISOString(),
          });
        }
      }}
    >
      <CheckCheck
        size={18}
        className={cn("mr-2", { "text-emerald-400": completed })}
      />
      Mark Complete
    </Toggle>
  );

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowDetails(true);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center">
        <Input placeholder="Filter titles..." className="max-w-[300px]" />
      </div>
      <div className="flex flex-col gap-y-6 overflow-y-auto">
        <ListColumn
          handleTaskClick={handleTaskClick}
          title="Backlog"
          tasks={backlog}
        />
        <ListColumn
          handleTaskClick={handleTaskClick}
          title="To-do"
          tasks={todo}
          accentColor="bg-sky-500"
        />
        <ListColumn
          handleTaskClick={handleTaskClick}
          title="In Progress"
          tasks={inProgress}
          accentColor="bg-amber-500"
        />
        <ListColumn
          handleTaskClick={handleTaskClick}
          title="Completed"
          tasks={done}
          accentColor="bg-green-500"
        />
      </div>

      {isDesktop ? (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent>
            <DialogHeader>{ToggleButton}</DialogHeader>
            <TaskDetails task={selectedTask!} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={showDetails} onOpenChange={setShowDetails}>
          <DrawerContent>
            <DrawerHeader className="py-0">{ToggleButton}</DrawerHeader>
            <div className="px-4 my-4">
              <TaskDetails task={selectedTask!} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
