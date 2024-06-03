"use client";

import { SettingsAppearance, DashboardSettings, SettingsTasks } from "@/routes";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

export const SettingsNav = () => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/").pop();

  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      <DashboardSettings.Link
        className={cn({
          "text-primary font-semibold": currentPath === "settings",
        })}
      >
        Account
      </DashboardSettings.Link>
      <SettingsAppearance.Link
        className={cn({
          "text-primary font-semibold": currentPath === "appearance",
        })}
      >
        Appearance
      </SettingsAppearance.Link>
      <SettingsTasks.Link
        className={cn({
          "text-primary font-semibold": currentPath === "tasks",
        })}
      >
        Tasks
      </SettingsTasks.Link>
    </nav>
  );
};
