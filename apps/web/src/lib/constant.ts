import type { IListColumn, IKanbanColumn } from "@/types/tasks";

import {
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDown,
  CircleCheck,
  ChevronsUp,
  CircleIcon,
  ChevronUp,
  CircleX,
  Timer,
} from "lucide-react";

export const COLUMN = ["backlog", "todo", "in progress", "completed"] as const;
export const STATUS = ["pending", "doing", "done", "cancelled"] as const;
export const PRIORITY = ["low", "normal", "high", "urgent"] as const;

export const listColumn: IListColumn = {
  backlog: [],
  todo: [],
  "in progress": [],
  completed: [],
};

export const kanbanColumn: IKanbanColumn = {
  backlog: [],
  todo: [],
  doing: [],
  done: [],
};

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
    icon2: ChevronDown,
  },
  {
    label: "Normal",
    value: "normal",
    icon: ArrowRightIcon,
    icon2: ChevronUp,
  },
  {
    label: "Urgent",
    value: "urgent",
    icon: ArrowUpIcon,
    icon2: ChevronsUp,
  },
];

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: CircleIcon,
  },
  {
    value: "doing",
    label: "Doing",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleX,
  },
];
