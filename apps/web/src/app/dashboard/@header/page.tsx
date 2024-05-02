import { Dashboard } from "@/routes";
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
          <Dashboard.Link>Dashboard</Dashboard.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
