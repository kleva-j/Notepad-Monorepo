import { DashboardTasks } from "@/routes";
import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@repo/ui/components/ui/breadcrumb";

export default function Page() {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <DashboardTasks.Link>Tasks</DashboardTasks.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
