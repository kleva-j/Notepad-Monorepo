"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { containerVariants, svgVariants } from "@/lib/utils";
import { ProjectLink } from "@/components/ProjectLink";
import { Button } from "@repo/ui/components/ui/button";
import { ProjectNav } from "@/components/ProjectNav";
import { ModeToggle } from "@/components/ModeToggle";
import { NavLink } from "@/components/Navlink";
import { useEffect, useState } from "react";
import {
  DashboardSettings,
  DashboardRecords,
  DashboardTasks,
  Dashboard,
} from "@/routes";
import {
  DocumentCheckIcon,
  Square2StackIcon,
  ChartBarIcon,
  ChartPieIcon,
  UsersIcon,
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

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-neutral-900 flex flex-col absolute p-5 top-0 left-0 gap-20 z-10 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-row justify-between place-items-center w-full">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
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
          <NavLink name="Dashboard" link={Dashboard.Link}>
            <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>

          <NavLink name="Records" link={DashboardRecords.Link}>
            <Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>

          <NavLink name="Tasks" link={DashboardTasks.Link}>
            <DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>

          <NavLink name="Settings" link={DashboardSettings.Link}>
            <ChartPieIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>

          <NavLink name="Users" link={Dashboard.Link}>
            <UsersIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
          </NavLink>
        </div>

        <div className="flex flex-col gap-y-3">
          <ProjectLink
            name="Virtual Reality"
            link={Dashboard.Link}
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 ml-2 border-pink-600 border rounded-full aspect-square bg-pink-700" />
          </ProjectLink>
          <ProjectLink
            name="Apple Vision Pro"
            link={Dashboard.Link}
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 ml-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
          </ProjectLink>
          <ProjectLink
            name="Porsche"
            setSelectedProject={setSelectedProject}
            link={Dashboard.Link}
          >
            <div className="min-w-4 ml-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700" />
          </ProjectLink>
          <ProjectLink
            name="Secret Project"
            link={Dashboard.Link}
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 ml-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
          </ProjectLink>
        </div>
        <ModeToggle className="my-auto bg-neutral-700/40 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700/30 transition-colors duration-100 rounded-xl" />
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
