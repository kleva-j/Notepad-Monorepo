import { SettingsDisplay } from "@/routes";
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
          <SettingsDisplay.Link>Display</SettingsDisplay.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
