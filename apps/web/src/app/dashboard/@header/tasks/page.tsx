import { DashboardRecords } from "@/routes";
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
          <DashboardRecords.Link>Tasks</DashboardRecords.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
