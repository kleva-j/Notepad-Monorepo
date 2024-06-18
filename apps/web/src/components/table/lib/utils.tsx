import type{ Task } from "@/types/tasks";
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
export function getStatusIcon(status: Task["status"]): React.ComponentType {
  const statusIcons: { [key in Task["status"]]: React.ComponentType } = {
    cancelled: CrossCircledIcon,
    done: CheckCircledIcon,
    doing: StopwatchIcon,
    pending: QuestionMarkCircledIcon,
  };

  return statusIcons[status] || CircleIcon;
}

/**
 * Returns the appropriate priority icon based on the provided priority.
 * @param priority - The priority of the task.
 * @returns {React.ComponentType} A React component representing the priority icon.
 */
export function getPriorityIcon(
  priority: Task["priority"]
): React.ComponentType {
  const priorityIcons: { [key in Task["priority"]]: React.ComponentType } = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    normal: ArrowRightIcon,
    urgent: ArrowLeftIcon,
  };

  return priorityIcons[priority] || CircleIcon;
}
