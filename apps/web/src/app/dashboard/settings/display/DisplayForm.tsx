"use client";

import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { toast } from "@repo/ui/components/ui/use-toast";
import { Button } from "@repo/ui/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  FormDescription,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@repo/ui/components/ui/form";
import { cn } from "@repo/ui/lib/utils";

const items = [
  { id: "recents", label: "Recents" },
  { id: "home", label: "Home" },
  { id: "applications", label: "Applications" },
  { id: "desktop", label: "Desktop" },
  { id: "downloads", label: "Downloads" },
  { id: "documents", label: "Documents" },
] as const;

const colorSchemes = ["neutral", "pink", "cyan", "indigo", "yellow"] as const;

const displayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  colorScheme: z.enum(colorSchemes, {
    required_error: "Please select a color scheme.",
  }),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  items: ["recents", "home"],
  colorScheme: "neutral",
};

export function DisplayForm() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });

  function onSubmit(data: DisplayFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colorScheme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base">Color Scheme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-y-3 pt-2"
              >
                {colorSchemes.map((scheme) => (
                  <FormItem key={scheme}>
                    <FormLabel className="p-1 flex justify-center items-center rounded-xl relative border border-neutral-300 dark:border-neutral-600 w-10 h-10 [&:has([data-state=checked])]:border-neutral-600 dark:[&:has([data-state=checked])]:border-neutral-300">
                      <FormControl className="">
                        <RadioGroupItem value={scheme} className="sr-only" />
                      </FormControl>
                      <div
                        className={cn(
                          "size-4 border rounded-full aspect-square",
                          `border-${scheme}-600 bg-${scheme}-700`,
                          { "border-primary": scheme === field.value }
                        )}
                      />
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit">Update display</Button>
      </form>
    </Form>
  );
}
