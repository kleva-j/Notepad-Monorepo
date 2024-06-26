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
          <DashboardRecords.Link>Records</DashboardRecords.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
