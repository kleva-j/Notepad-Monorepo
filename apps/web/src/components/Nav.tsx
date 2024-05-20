"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { containerVariants, svgVariants } from "@/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { ProjectNav } from "@/components/ProjectNav";
import { LayoutDashboard } from "lucide-react";
import { NavLink } from "@/components/Navlink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DashboardSettings,
  DashboardRecords,
  DashboardTasks,
  Dashboard,
} from "@/routes";

import {
  DocumentCheckIcon,
  FolderOpenIcon,
  Cog6ToothIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };

  const pathname = usePathname();
  const currentPath = pathname?.split("/").pop() as string;

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-neutral-900 flex flex-col fixed p-5 top-0 left-0 gap-20 z-10 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-row justify-between place-items-center w-full">
          <div className="w-10 h-10 rounded-full" />
          <Button
            size="icon"
            className="bg-transparent hover:bg-transparent"
            onClick={handleToggle}
          >
            <svg
              className="w-10 h-10 stroke-neutral-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1}
              fill="none"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
        </div>

        <div className="flex flex-col gap-y-3">
          <NavLink
            name="Dashboard"
            link={Dashboard.Link}
            isActive={currentPath === "dashboard"}
          >
            <LayoutDashboard className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>

          <NavLink
            name="Records"
            link={DashboardRecords.Link}
            isActive={currentPath === "records"}
          >
            {currentPath === "records" ? (
              <FolderOpenIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
            ) : (
              <FolderIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
            )}
          </NavLink>

          <NavLink
            name="Tasks"
            link={DashboardTasks.Link}
            isActive={currentPath === "tasks"}
          >
            <DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>

          <NavLink
            name="Settings"
            link={DashboardSettings.Link}
            isActive={["settings", "appearance"].includes(currentPath)}
          >
            <Cog6ToothIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNav
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};
