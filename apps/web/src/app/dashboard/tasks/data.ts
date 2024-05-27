import { TableTask } from "@/tasks/TableColumn";
import { getRandomDate } from "@/lib/utils";
import {
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CircleCheck,
  CircleIcon,
  CircleX,
  Timer,
} from "lucide-react";

import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Normal",
    value: "normal",
    icon: ArrowRightIcon,
  },
  {
    label: "Urgent",
    value: "urgent",
    icon: ArrowUpIcon,
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

export const TableData: TableTask[] = [
  {
    id: "1",
    title: "Look into render bug in dashboard",
    column: "backlog",
    status: "pending",
    priority: "urgent",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "2",
    title: "SOX compliance checklist",
    column: "backlog",
    status: "doing",
    priority: "low",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "3",
    title: "[SPIKE] Migrate to Azure",
    column: "backlog",
    status: "done",
    priority: "normal",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "4",
    title: "Document Notifications service",
    column: "backlog",
    status: "pending",
    priority: "normal",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "5",
    title: "Research DB options for new microservice",
    column: "todo",
    status: "done",
    priority: "low",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "6",
    title: "Postmortem for outage",
    column: "todo",
    status: "pending",
    priority: "urgent",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "7",
    title: "Sync with product on Q3 roadmap",
    column: "todo",
    status: "pending",
    priority: "urgent",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "8",
    title: "Refactor context providers to use Zustand",
    column: "in progress",
    status: "doing",
    priority: "urgent",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "9",
    title: "Add logging to daily CRON",
    column: "in progress",
    status: "doing",
    priority: "urgent",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "10",
    title: "Set up DD dashboards for Lambda listener",
    column: "completed",
    status: "done",
    priority: "urgent",
    recordId: uid.rnd(15),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
];

export const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

export type BaseTaskProps = {
  id: string;
  title: string;
  column: string;
};

export interface IKanbanColumn {
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

export const getCardByColumn = () => {
  const cardsByColumn: IKanbanColumn = DEFAULT_CARDS.reduce((acc, card) => {
    acc[card.column as keyof IKanbanColumn].push(card);
    return acc;
  }, kanbanColumn);
  return cardsByColumn;
};

export interface IListColumn {
  backlog: TableTask[];
  todo: TableTask[];
  "in progress": TableTask[];
  completed: TableTask[];
}

const listColumn: IListColumn = {
  backlog: [],
  todo: [],
  "in progress": [],
  completed: [],
};

export const getTableDataByColumn = () => {
  const cardsByColumn: IListColumn = TableData.reduce((acc, card) => {
    acc[card.column as keyof IListColumn].push(card);
    return acc;
  }, listColumn);
  return cardsByColumn;
};
