"use client";

import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { appearanceAtom, settingsAtom } from "@/atoms/Settings";
import { Button } from "@repo/ui/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom, useAtomValue } from "jotai";
import { getMetadataFromUser } from "@/lib/user";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { cn } from "@repo/ui/lib/utils";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { isEqual } from "lodash";
import { toast } from "sonner";
import { z } from "zod";

import {
  FormDescription,
  FormMessage,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@repo/ui/components/ui/form";

const colorSchemes = ["neutral", "pink", "cyan", "indigo", "yellow"] as const;

const appearanceFormSchema = z.object({
  theme: z
    .enum(["light", "dark"], {
      required_error: "Please select a theme.",
    })
    .default("light"),
  colorScheme: z
    .enum(colorSchemes, {
      required_error: "Please select a color scheme.",
    })
    .default("neutral"),
});

export type AppearanceFormInput = z.input<typeof appearanceFormSchema>;
export type AppearanceFormOutput = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
  const { setTheme } = useTheme();
  const { isLoaded, user } = useUser();
  const updateSettings = useSetAtom(settingsAtom);
  const values = useAtomValue(appearanceAtom) as AppearanceFormInput;

  const form = useForm<AppearanceFormOutput>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: values,
  });

  useEffect(() => {
    if (isLoaded && user) {
      const { appearance } = getMetadataFromUser(user);
      if (!isEqual(appearance, values)) {
        updateSettings((settings) => ({ ...settings, appearance }));
        form.reset(appearance as AppearanceFormOutput);
      }
    }
  }, [isLoaded]);

  async function onSubmit(appearance: AppearanceFormOutput) {
    if (isLoaded && user) {
      toast.info("Saving...");
      try {
        await user.update({
          unsafeMetadata: { ...user.unsafeMetadata, ...appearance },
        });
        updateSettings((settings) => ({ ...settings, appearance }));
        toast.success("Theme and color scheme updated");
      } catch (error) {
        toast.error("Could not update appearance");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base">Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={(value) => {
                  setTheme(value);
                  field.onChange(value);
                }}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel
                    className={cn(
                      "[&:has([data-state=checked])>div]:border-primary",
                      {
                        // "[&_>_div]:border-primary": field.value === "light",
                      }
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel
                    className={cn(
                      "[&:has([data-state=checked])>div]:border-primary",
                      {
                        // "[&_>_div]:border-primary": field.value === "dark",
                      }
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
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
                <FormItem>
                  <FormLabel
                    className={cn(
                      "p-1 flex justify-center items-center rounded-xl relative border border-neutral-300 dark:border-neutral-600 w-10 h-10",
                      {
                        "border-primary dark:border-neutral-200":
                          field.value === "neutral",
                      }
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="neutral" className="sr-only" />
                    </FormControl>
                    <div
                      className={cn(
                        "size-4 border rounded-full aspect-square border-neutral-600 bg-neutral-700",
                        {
                          "border-primary dark:border-neutral-200":
                            field.value === "neutral",
                        }
                      )}
                    />
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel
                    className={cn(
                      "p-1 flex justify-center items-center rounded-xl relative border border-neutral-300 dark:border-neutral-600 w-10 h-10",
                      {
                        "border-primary dark:border-neutral-200":
                          field.value === "pink",
                      }
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="pink" className="sr-only" />
                    </FormControl>
                    <div
                      className={cn(
                        "size-4 border rounded-full aspect-square border-pink-600 bg-pink-700",
                        {
                          "border-primary dark:border-neutral-200":
                            field.value === "pink",
                        }
                      )}
                    />
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel
                    className={cn(
                      "p-1 flex justify-center items-center rounded-xl relative border border-neutral-300 dark:border-neutral-600 w-10 h-10",
                      {
                        "border-primary dark:border-neutral-200":
                          field.value === "cyan",
                      }
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="cyan" className="sr-only" />
                    </FormControl>
                    <div
                      className={cn(
                        "size-4 border rounded-full aspect-square border-cyan-600 bg-cyan-700",
                        {
                          "border-primary dark:border-neutral-200":
                            field.value === "cyan",
                        }
                      )}
                    />
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel
                    className={cn(
                      "p-1 flex justify-center items-center rounded-xl relative border border-neutral-300 dark:border-neutral-600 w-10 h-10",
                      {
                        "border-primary dark:border-neutral-200":
                          field.value === "indigo",
                      }
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="indigo" className="sr-only" />
                    </FormControl>
                    <div
                      className={cn(
                        "size-4 border rounded-full aspect-square border-indigo-600 bg-indigo-700",
                        {
                          "border-primary dark:border-neutral-200":
                            field.value === "indigo",
                        }
                      )}
                    />
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel
                    className={cn(
                      "p-1 flex justify-center items-center rounded-xl relative border border-neutral-300 dark:border-neutral-600 w-10 h-10",
                      {
                        "border-primary dark:border-neutral-200":
                          field.value === "yellow",
                      }
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="yellow" className="sr-only" />
                    </FormControl>
                    <div
                      className={cn(
                        "size-4 border rounded-full aspect-square border-yellow-600 bg-yellow-700",
                        {
                          "border-primary dark:border-neutral-200":
                            field.value === "yellow",
                        }
                      )}
                    />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
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
          Update appearance
        </Button>
      </form>
    </Form>
  );
}
