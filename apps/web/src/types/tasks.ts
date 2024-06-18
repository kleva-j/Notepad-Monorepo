import { COLUMN, PRIORITY, STATUS } from "@/lib/constant";
import { z } from "zod";

export type ColumnType = {
  id: string;
  title: string;
  column: string;
};

export interface IKanbanColumn {
  backlog: ColumnType[];
  todo: ColumnType[];
  doing: ColumnType[];
  done: ColumnType[];
}

export interface IListColumn {
  backlog: Task[];
  todo: Task[];
  "in progress": Task[];
  completed: Task[];
}

export type Column = z.infer<typeof columnEnum>;
export type Status = z.infer<typeof statusEnum>;
export type Priority = z.infer<typeof priorityEnum>;

export const columnEnum = z.enum(COLUMN);
export const statusEnum = z.enum(STATUS);
export const priorityEnum = z.enum(PRIORITY);

export type Task = {
  id: string;
  title: string;
  column: Column;
  status: Status;
  priority: Priority;
  createdAt: string;
  updatedAt?: string | null;
  completedAt?: string | null;
  dueDate?: string | null;
  tags: string[];
  description?: string;
  noteId?: string;
};
