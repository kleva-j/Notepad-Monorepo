"use client";

import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { settingsAtom, tasksAtom } from "@/atoms/Settings";
import { Slider } from "@repo/ui/components/ui/slider";
import { Button } from "@repo/ui/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { getMetadataFromUser } from "@/lib/user";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { isEqual } from "lodash";
import { toast } from "sonner";
import { z } from "zod";

import {
  FormDescription,
  FormMessage,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  Form,
} from "@repo/ui/components/ui/form";

const layouts = ["kanban", "list", "table"] as const;

export const TasksFormSchema = z.object({
  layout: z.enum(layouts).default("kanban"),
  columns: z.number().min(1).max(5).default(3),
});

export type TasksFormInput = z.input<typeof TasksFormSchema>;
export type TasksFormOutput = z.infer<typeof TasksFormSchema>;

export const TasksForm = () => {
  const { isLoaded, user } = useUser();
  const updateSettings = useSetAtom(settingsAtom);
  const defaultValues = useAtomValue(tasksAtom) as TasksFormOutput;

  const form = useForm<TasksFormOutput>({
    resolver: zodResolver(TasksFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isLoaded && user) {
      const { tasks } = getMetadataFromUser(user);
      if (!isEqual(tasks, defaultValues)) {
        updateSettings((settings) => ({ ...settings, tasks }));
        form.reset(tasks as TasksFormOutput);
      }
    }
  }, [isLoaded]);

  async function onSubmit(tasks: TasksFormOutput) {
    if (isLoaded && user) {
      toast.info("Saving...");
      try {
        await user.update({
          unsafeMetadata: { ...user.unsafeMetadata, ...tasks },
        });
        updateSettings((settings) => ({ ...settings, tasks }));
        toast.success("Tasks form submitted");
      } catch (error) {
        toast.error("Could not update tasks settings");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="layout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Layout</FormLabel>
              <FormDescription>
                Select the layout for the tasks.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-3 gap-4"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="kanban" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="flex space-x-2.5 rounded-sm bg-neutral-950 p-2">
                        <div className="flex w-full flex-col space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                          <div className="h-2 w-full rounded-sm bg-neutral-400" />
                          <div className="h-2 w-full rounded-sm bg-neutral-400" />
                          <div className="h-2 w-full rounded-sm bg-neutral-400" />
                          <div className="h-2 w-full rounded-sm bg-neutral-400" />
                          <div className="h-2 w-full rounded-sm bg-transparent" />
                        </div>
                        <div className="flex w-full flex-col space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                          <div className="h-2 w-full rounded bg-neutral-400" />
                          <div className="h-2 w-full rounded bg-neutral-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Kanban
                    </span>
                  </FormLabel>
                </FormItem>

                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="list" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
                        <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                          <div className="h-2 w-full rounded-lg bg-neutral-400" />
                          <div className="h-2 w-full rounded-lg bg-neutral-400" />
                        </div>
                        <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                          <div className="h-2 w-full rounded-lg bg-neutral-400" />
                          <div className="h-2 w-full rounded-lg bg-neutral-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      List
                    </span>
                  </FormLabel>
                </FormItem>

                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="table" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="flex items-center space-x-1.5 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-2 rounded-lg bg-slate-400" />
                          <div className="h-2 w-8 rounded-lg bg-slate-400" />
                          <div className="h-2 w-3 rounded-lg bg-slate-400" />
                          <div className="h-2 w-6 rounded-lg bg-slate-400" />
                        </div>
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="flex gap-x-1">
                            <div className="h-2 w-2 rounded-lg bg-slate-400" />
                            <div className="h-2 w-full rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex gap-x-1">
                            <div className="h-2 w-2 rounded-lg bg-slate-400" />
                            <div className="h-2 w-full rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex gap-x-1">
                            <div className="h-2 w-2 rounded-lg bg-slate-400" />
                            <div className="h-2 w-full rounded-lg bg-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Table
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="columns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Columns</FormLabel>
              <FormDescription>
                Select the number of tasks columns.
              </FormDescription>
              <FormMessage />
              <Slider
                min={1}
                max={5}
                step={1}
                minStepsBetweenThumbs={1}
                defaultValue={[field.value]}
                value={[field.value]}
                onValueChange={field.onChange}
                className="max-w-md border rounded relative"
              />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            !form.formState.isValid ||
            !form.formState.isDirty ||
            form.formState.isLoading ||
            !isLoaded
          }
        >
          {!isLoaded && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  );
};
