import type { PropsWithChildren } from "react";

import { DashboardSettings } from "@/routes";
import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@repo/ui/components/ui/breadcrumb";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <DashboardSettings.Link>Settings</DashboardSettings.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {children}
    </>
  );
}
