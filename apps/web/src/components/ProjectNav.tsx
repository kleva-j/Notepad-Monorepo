/* eslint-disable no-unused-vars */
import type { FC } from "react";

import { Input } from "@repo/ui/components/ui/input";
import { projectNavVariants } from "@/lib/utils";
import { NavLink } from "@/components/Navlink";
import { cn } from "@repo/ui/lib/utils";
import { motion } from "framer-motion";
import {
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
  PencilIcon,
  XMarkIcon,
  BoltIcon,
  UserIcon,
} from "@heroicons/react/24/outline"

import Link from "next/link";

type ProjectNavProps = {
  setSelectedProject: (project: string | null) => void;
  selectedProject: string;
  isOpen: boolean;
};

export const ProjectNav: FC<ProjectNavProps> = (props) => {
  const { isOpen, selectedProject, setSelectedProject } = props;

  return (
    <motion.nav
      exit="close"
      animate="open"
      initial="close"
      variants={projectNavVariants}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn(
        "bg-neutral-900 flex flex-col absolute p-5 gap-8 h-full w-64 ml-0 border-r border-neutral-800",
        { "left-64": isOpen, "left-20": !isOpen }
      )}
    >
      <div className="flex flex-row w-full justify-between place-items-center">
        <h1 className="tracking-wide text-neutral-100 text-lg">
          {selectedProject}
        </h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <Input
        type="text"
        placeholder="Search"
        className="px-3 py-2 tracking-wide rounded-lg bg-neutral-600/40 text-neutral-100"
      />
      <div className="flex flex-col gap-3">
        <NavLink name="Progress" href="#">
          <ArrowTrendingUpIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavLink>
        <NavLink name="Team Members" href="#">
          <UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavLink>
        <NavLink name="In Review" href="#">
          <PencilIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavLink>
        <NavLink name="In Progress" href="#">
          <BoltIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavLink>
        <NavLink name="Up Next" href="#">
          <CursorArrowRaysIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavLink>
        <NavLink name="Project Settings" href="#">
          <AdjustmentsHorizontalIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavLink>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="tracking-wide text-neutral-300">Team Members</h1>
        <Link href="#" className="flex flex-row gap-3 place-items-center">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-rose-800 bg-rose-200/70" />
          <p className="tracking-wide text-neutral-400">Steve Jobs</p>
        </Link>
        <Link href="#" className="flex flex-row gap-3 place-items-center">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-emerald-800 bg-emerald-200/70" />
          <p className="tracking-wide text-neutral-400">Bill Gates</p>
        </Link>
        <Link href="#" className="flex flex-row gap-3 place-items-center">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-indigo-800 bg-indigo-200/70" />
          <p className="tracking-wide text-neutral-400">Jeff Bezos</p>
        </Link>
      </div>
    </motion.nav>
  );
};
