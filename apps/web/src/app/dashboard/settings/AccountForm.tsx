"use client";

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Calendar } from "@repo/ui/components/ui/calendar";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { cn } from "@repo/ui/lib/utils";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Command,
  CommandList,
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
    .max(30, { message: "Name must not be longer than 30 characters." }),
  dob: z.date({ required_error: "A date of birth is required." }),
  language: z.string({ required_error: "Please select a language." }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

type PartialValues = Partial<AccountFormValues>;

export function AccountForm() {
  let defaultValues: PartialValues = {};
  const { isLoaded, user } = useUser();

  if (isLoaded && user) {
    const { dob, language } = user.unsafeMetadata as PartialValues;
    defaultValues = {
      name: `${user.firstName} ${user.lastName}`,
      dob: dob || new Date("2023-01-23"),
      language: language || languages[0].value,
    };
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit({ name, dob, language }: AccountFormValues) {
    if (isLoaded && user) {
      const [firstName, lastName] = name.split(" ");
      const promise = user.update({
        firstName,
        lastName,
        unsafeMetadata: { dob, language },
      });
      toast.promise(promise, {
        loading: "Saving...",
        success: "Profile updated",
        error: "Could not update profile",
      });
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
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
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
              <FormLabel>Language</FormLabel>
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
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                            onSelect={() => {
                              form.setValue("language", language.value);
                              console.log("Got here", {
                                values: form.getValues(),
                              });
                            }}
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
        <Button type="submit" disabled={!form.formState.isValid || !isLoaded}>
          {!isLoaded && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update account
        </Button>
      </form>
    </Form>
  );
}
