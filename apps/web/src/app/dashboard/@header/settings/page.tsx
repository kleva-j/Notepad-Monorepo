import { DashboardSettings } from "@/routes";
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
          <DashboardSettings.Link>Account</DashboardSettings.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
