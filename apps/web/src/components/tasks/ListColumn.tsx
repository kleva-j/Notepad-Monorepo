"use client";

import { CheckCheck, ChevronUp, PlusIcon } from "lucide-react";
import { TaskDetails } from "@/components/tasks/TaskDetails";
import { Separator } from "@repo/ui/components/ui/separator";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { useMemo, useState, useCallback } from "react";
import { TableTask } from "@/app/dashboard/tasks/data";
import { ListCard } from "@/components/tasks/ListCard";
import { Toggle } from "@repo/ui/components/ui/toggle";
import { Badge } from "@repo/ui/components/ui/badge";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@repo/ui/lib/utils";
import { motion } from "framer-motion";

import {
  DialogContent,
  DialogHeader,
  Dialog,
} from "@repo/ui/components/ui/dialog";
import {
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  Table,
} from "@repo/ui/components/ui/table";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@repo/ui/components/ui/collapsible";
import {
  DrawerContent,
  DrawerHeader,
  Drawer,
} from "@repo/ui/components/ui/drawer";

type ColumnProps = {
  title: string;
  tasks: any[];
  accentColor?: string;
};

const MotionChevron = motion(ChevronUp);

export const ListColumn = (props: ColumnProps) => {
  const { title, tasks, accentColor = "bg-gray-500" } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TableTask>();
  const [showDetails, setShowDetails] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [data, setData] = useState(
    tasks.map((task) => ({ idx: task.id, checked: false }))
  );

  const _allChecked = useMemo(() => {
    return data.every((d) => d.checked);
  }, [data]);

  const handleCheckedChange = useCallback((idx: string) => {
    setData((prevData) =>
      prevData.map((d) => (d.idx === idx ? { ...d, checked: !d.checked } : d))
    );
  }, []);

  const handleCheckAll = () => {
    setData((prevData) =>
      prevData.map((d) => ({ ...d, checked: !_allChecked }))
    );
  };

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

  return (
    <>
      <Collapsible
        open={isCollapsed}
        onOpenChange={setIsCollapsed}
        className="space-y-2"
      >
        <div className="flex items-center justify-between px-4 py-2 gap-x-4 rounded bg-neutral-200 hover:bg-neutral-300/70 dark:bg-neutral-800 dark:hover:bg-neutral-800/70 cursor-pointer transition-colors duration-200">
          <CollapsibleTrigger asChild>
            <div className="flex items-center flex-1">
              <MotionChevron
                variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
                animate={isCollapsed ? "open" : "closed"}
                className="h-4 w-4"
              />
              <Separator
                className={cn("h-4 w-[3px] mx-4 rounded", accentColor)}
                orientation="vertical"
              />
              <h4 className="text-sm font-semibold mr-2">{title}</h4>
              <Badge className="rounded-sm px-1.5" variant="secondary">
                {tasks.length}
              </Badge>
            </div>
          </CollapsibleTrigger>
          <PlusIcon className="h-4 w-4 ml-auto" />
        </div>

        <CollapsibleContent className="space-y-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    className="relative top-[2px]"
                    checked={_allChecked}
                    onCheckedChange={handleCheckAll}
                  />
                </TableHead>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(({ idx, checked }, i) => {
                const task = tasks[i];
                return (
                  <ListCard
                    key={idx}
                    task={task}
                    checked={checked}
                    onCheckChange={handleCheckedChange}
                    handleClick={() => {
                      setSelectedTask(task);
                      setShowDetails(true);
                    }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
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
    </>
  );
};
