import { SettingsAppearance } from "@/routes";
import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@repo/ui/components/ui/breadcrumb";

export default function AppearancePage() {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <SettingsAppearance.Link>Appearance</SettingsAppearance.Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
}
