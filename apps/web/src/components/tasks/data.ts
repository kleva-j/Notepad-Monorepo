import type { Task } from "@/types/tasks";

import { getRandomDate } from "@/lib/utils";
import { generateId } from "@/lib/id";

export const TableData: Task[] = [
  {
    id: "1",
    title: "Look into render bug in dashboard",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    column: "backlog",
    status: "pending",
    priority: "urgent",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
    dueDate: getRandomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: "2",
    title: "SOX compliance checklist",
    column: "backlog",
    status: "doing",
    priority: "low",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "3",
    title: "[SPIKE] Migrate to Azure",
    column: "backlog",
    status: "done",
    priority: "normal",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "4",
    title: "Document Notifications service",
    column: "backlog",
    status: "pending",
    priority: "normal",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "5",
    title: "Research DB options for new microservice",
    column: "todo",
    status: "done",
    priority: "low",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "6",
    title: "Postmortem for outage",
    column: "todo",
    status: "pending",
    priority: "urgent",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "7",
    title: "Sync with product on Q3 roadmap",
    column: "todo",
    status: "pending",
    priority: "urgent",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "8",
    title: "Refactor context providers to use Zustand",
    column: "in progress",
    status: "doing",
    priority: "urgent",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "9",
    title: "Add logging to daily CRON",
    column: "in progress",
    status: "doing",
    priority: "urgent",
    noteId: generateId(),
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date()),
    tags: [],
  },
  {
    id: "10",
    title: "Set up DD dashboards for Lambda listener",
    column: "completed",
    status: "done",
    priority: "urgent",
    noteId: generateId(),
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
