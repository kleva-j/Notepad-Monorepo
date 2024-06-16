"use client";

import type { CreateTaskSchema } from "@/lib/validation";

import { Textarea } from "@repo/ui/components/ui/textarea";
import { api } from "@repo/backend/convex/_generated/api";
import { Button } from "@repo/ui/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/ui/input";
import { Loader2, Minus, Plus } from "lucide-react";
import { priorities, statuses } from "@/tasks/data";
import { createTaskSchema } from "@/lib/validation";
import { useState, useTransition } from "react";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

type ComponentProps = { submitHandler: () => void | Promise<void> };

export function CreateTaskForm({ submitHandler }: ComponentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const _createTask = useMutation(api.notes.createActionItem);

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      column: "backlog",
      status: "pending",
      priority: "normal",
      noteId: "",
      tags: [],
    },
  });

  function onSubmit(data: CreateTaskSchema) {
    startTransition(() => {

      toast.success("Task created 🎉");

      submitHandler();
    });
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
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
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
                            <SelectItem
                              key={value}
                              value={value}
                              className="capitalize"
                            >
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
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
