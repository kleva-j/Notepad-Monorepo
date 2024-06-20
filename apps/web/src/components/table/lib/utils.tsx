import type { DataTableFilterField, IconProps } from "@/types";
import type { Priority, Status, Task } from "@/types/tasks";

import { isRedirectError } from "next/dist/client/components/redirect";
import { PRIORITY, STATUS } from "@/lib/constant";
import { toast } from "sonner";
import { z } from "zod";
import {
  QuestionMarkCircledIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
  StopwatchIcon,
  ArrowUpIcon,
  CircleIcon,
} from "@radix-ui/react-icons";

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns {React.ComponentType} A React component representing the status icon.
 */
export function getStatusIcon(status: Status): React.ComponentType<IconProps> {
  const IconComponent =
    {
      cancelled: CrossCircledIcon,
      done: CheckCircledIcon,
      doing: StopwatchIcon,
      pending: QuestionMarkCircledIcon,
    }[status] || CrossCircledIcon;

  return (props: any) => <IconComponent {...props} />;
}

/**
 * Returns the appropriate priority icon based on the provided priority.
 * @param priority - The priority of the task.
 * @returns {React.ComponentType} A React component representing the priority icon.
 */
export function getPriorityIcon(priority: Priority): React.ComponentType<IconProps> {
  const IconComponent =
    {
      high: ArrowUpIcon,
      low: ArrowDownIcon,
      normal: ArrowRightIcon,
      urgent: ArrowLeftIcon,
    }[priority] || CircleIcon;

  return (props: any) => <IconComponent {...props} />;
}

export function getErrorMessage(err: unknown) {
  const unknownError = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  } else if (isRedirectError(err)) {
    throw err;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  export const filterFields: DataTableFilterField<Task>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },
    {
      label: "Status",
      value: "status",
      options: STATUS.map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: getStatusIcon(status),
        withCount: true,
      })),
    },
    {
      label: "Priority",
      value: "priority",
      options: PRIORITY.map((priority) => ({
        label: priority[0]?.toUpperCase() + priority.slice(1),
        value: priority,
        icon: getPriorityIcon(priority),
        withCount: true,
      })),
    },
  ]
