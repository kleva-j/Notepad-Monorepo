import { COLUMN, STATUS, PRIORITY } from "@/tasks/data";
import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export const getTasksSchema = searchParamsSchema;

export type GetTasksSchema = z.infer<typeof getTasksSchema>;

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),
  description: z
    .string()
    .max(1000, { message: "Description is too long" })
    .optional(),
  column: z
    .enum(COLUMN, { required_error: "Please select a column field." })
    .default("backlog"),
  status: z
    .enum(STATUS, { required_error: "Please select a status field." })
    .default("pending"),
  priority: z
    .enum(PRIORITY, { required_error: "Please select a priority field." })
    .default("normal"),
  noteId: z.string({ required_error: "Please select a note." }).uuid().optional(),
  tags: z.array(z.string()).default([]),
});

export const updateTaskSchema = createTaskSchema.partial().strict();

export type CreateTaskInput = z.input<typeof createTaskSchema>;
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
