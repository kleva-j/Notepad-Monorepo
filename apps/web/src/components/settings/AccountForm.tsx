"use client";

import { accountAtom, settingsAtom } from "@/atoms/Settings";
import { Calendar } from "@repo/ui/components/ui/calendar";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/ui/input";
import { useAtomValue, useSetAtom } from "jotai";
import { getMetadataFromUser } from "@/lib/user";
import { ChevronsUpDown } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { cn } from "@repo/ui/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { format } from "date-fns";
import { isEqual } from "lodash";
import { toast } from "sonner";
import { z } from "zod";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "@repo/ui/components/ui/command";
import {
  FormDescription,
  FormMessage,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@repo/ui/components/ui/form";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@repo/ui/components/ui/popover";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." })
    .default(""),
  dob: z
    .date({ required_error: "A date of birth is required." })
    .default(new Date()),
  language: z
    .string({ required_error: "Please select a language." })
    .default(languages[0].value),
});

export type AccountFormOutput = z.infer<typeof accountFormSchema>;
export type AccountFormInput = z.input<typeof accountFormSchema>;
export type AccountFormType = AccountFormOutput;

export function AccountForm() {
  const { isLoaded, user } = useUser();
  const updateSettings = useSetAtom(settingsAtom);
  const defaultValues = useAtomValue(accountAtom) as AccountFormType;

  const form = useForm<AccountFormOutput>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isLoaded && user) {
      const { account } = getMetadataFromUser(user);
      if (!isEqual(account, defaultValues)) {
        updateSettings((settings) => ({ ...settings, account }));
        form.reset({
          name: account.name,
          dob: account.dob,
          language: account.language,
        });
      }
    }
  }, [isLoaded]);

  async function onSubmit(account: AccountFormOutput) {
    if (isLoaded && user) {
      toast.info("Saving...");
      try {
        const [firstName, lastName] = account.name.split(" ");
        const unsafeMetadata = { ...user.unsafeMetadata, ...account };

        await user.update({ firstName, lastName, unsafeMetadata });

        updateSettings((settings) => ({ ...settings, account }));

        toast.success("Account profile updated");
      } catch (error) {
        toast.error("Could not update account profile");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  className="max-w-md"
                  disabled={!isLoaded || !user}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="w-fit">Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={!isLoaded || !user}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="w-fit">Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={!isLoaded || !user}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => form.setValue("language", language.value)}
                            className="text-primary"
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty || !isLoaded}>
          {!isLoaded && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update account
        </Button>
      </form>
    </Form>
  );
}
