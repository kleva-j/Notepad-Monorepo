"use client";

import type { Column, Priority, Status } from "@/tasks/data";

import { Textarea } from "@repo/ui/components/ui/textarea";
import { Button } from "@repo/ui/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/ui/input";
import { Loader2, Minus, Plus } from "lucide-react";
import { priorities, statuses } from "@/tasks/data";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectItem,
  Select,
} from "@repo/ui/components/ui/select";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@repo/ui/components/ui/collapsible";
import {
  FormMessage,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@repo/ui/components/ui/form";

const createTaskFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),
  description: z
    .string()
    .max(1000, { message: "Description is too long" })
    .optional(),
  recordId: z.string({ required_error: "Please provide a valid Record-Id." }),
  column: z
    .enum(["backlog", "todo", "in progress", "completed"], {
      required_error: "Please select a column field.",
    })
    .default("backlog"),
  status: z
    .enum(["pending", "doing", "done", "cancelled"], {
      required_error: "Please select a status field.",
    })
    .default("pending"),
  priority: z
    .enum(["low", "normal", "high", "urgent"], {
      required_error: "Please select a priority field.",
    })
    .default("normal"),
  createdAt: z
    .date({ required_error: "Please provide a valid date." })
    .default(new Date()),
  tags: z.array(z.string()).optional(),
});

type createTaskFormInput = z.input<typeof createTaskFormSchema>;
type createTaskFormOutput = z.infer<typeof createTaskFormSchema>;

const formValues: createTaskFormInput = {
  title: "",
  description: "",
  recordId: "",
  column: "backlog" as Column,
  status: "pending" as Status,
  priority: "normal" as Priority,
  createdAt: new Date(),
  tags: [],
};

export function CreateTaskForm() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const form = useForm<createTaskFormOutput>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: formValues,
  });

  function onSubmit(data: createTaskFormOutput) {
    console.log(data);
    setLoading(true);
    const promise = new Promise<void>((resolve) => setTimeout(resolve, 1500));
    toast.promise(promise, {
      loading: "Saving...",
      success: "New task created",
      error: "Could not create task",
    });
    setLoading(false);
  }

  const CollapsibleIcon = isCollapsed ? Minus : Plus;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed}>
          <CollapsibleTrigger asChild>
            <span className="text-xs cursor-pointer flex items-center justify-end text-gray-500 hover:text-gray-400">
              Show {!isCollapsed ? "more" : "less"}
              <CollapsibleIcon className="h-4 w-4 ml-0.5" />
            </span>
          </CollapsibleTrigger>

          <CollapsibleContent className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="You can add a little description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-x-3 justify-between">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-[180px]">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pending" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {statuses.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-[180px]">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Priority</SelectLabel>
                          {priorities.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-end">
          <Button type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
