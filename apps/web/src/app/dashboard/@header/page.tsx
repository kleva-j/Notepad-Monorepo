import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@repo/ui/components/ui/breadcrumb";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="#">Dashboard</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
