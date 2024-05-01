"use client";

import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { EraserIcon } from "@/components/icons/Eraser";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";

const data = [
  {
    id: "1",
    name: "Complete user interface redesign",
    priority: "High",
    completed: true,
    updatedAt: "2023-09-15T14:48:00Z",
  },
  {
    id: "2",
    name: "Implement feature X with API integration",
    priority: "High",
    completed: false,
    updatedAt: null,
  },
  {
    id: "3",
    name: "Fix bug in payment gateway processing",
    priority: "Medium",
    completed: true,
    updatedAt: "2023-09-20T09:30:00Z",
  },
  {
    id: "4",
    name: "Optimize database queries for reporting module",
    priority: "Low",
    completed: false,
    updatedAt: null,
  },
  {
    id: "5",
    name: "Conduct usability testing with focus groups",
    priority: "Medium",
    completed: false,
    updatedAt: null,
  },
  {
    id: "6",
    name: "Update documentation for new software version",
    priority: "Low",
    completed: true,
    updatedAt: "2023-09-18T16:00:00Z",
  },
  {
    id: "7",
    name: "Refactor legacy code in module Y",
    priority: "High",
    completed: false,
    updatedAt: null,
  },
  {
    id: "8",
    name: "Prepare presentation for upcoming conference",
    priority: "Medium",
    completed: true,
    updatedAt: "2023-09-22T12:00:00Z",
  },
];

export const TaskList = () => {
  return (
    <ul className="flex flex-col divide-y divide-gray-300 dark:divide-neutral-700 border rounded border-gray-300 dark:border-neutral-700">
      {data.slice(0, 4).map((item) => (
        <TaskItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export type TaskItemProps = {
  id: string;
  name: string;
  priority: string;
  completed: boolean;
  updatedAt: string | null;
};

export const TaskItem = ({ name, completed }: TaskItemProps) => {
  const [isChecked, setIsChecked] = useState<Boolean>(completed);

  const handleCheckedChange = (newChecked: boolean) => {
    setIsChecked(newChecked);
  };

  return (
    <li className="flex items-center justify-between px-3 py-2">
      <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1">
        <div className="flex items-center">
          <Checkbox
            className="w-4 h-4 border-sky-300 rounded data-[state=checked]:bg-sky-300 data-[state=checked]:text-white dark:bg-neutral-700 dark:data-[state=checked]:bg-sky-500 dark:border-sky-600"
            defaultChecked={completed}
            onCheckedChange={handleCheckedChange}
            value={isChecked.toString()}
          />
          <span
            className={cn(
              "ml-4 text-neutral-800 font-light dark:text-neutral-200",
              { "line-through text-neutral-600": isChecked }
            )}
          >
            {name}
          </span>
        </div>
      </Label>
  
      <div className="flex gap-x-2">
        <Button
          size="icon"
          className="w-8 h-8 rounded-full text-emerald-300 hover:text-emerald-400"
          variant="ghost"
          aria-label="Edit"
          title="Edit"
        >
          <EraserIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          className="w-8 h-8 rounded-full text-red-300 hover:text-red-400"
          variant="ghost"
          aria-label="Delete"
          title="Delete"
        >
          <ArchiveBoxIcon className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}
