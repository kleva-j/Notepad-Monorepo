/* eslint-disable no-unused-vars */
import type { FC, PropsWithChildren } from "react";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@repo/ui/components/ui/button";

type ProjectLinkProps = PropsWithChildren & {
  name: string;
  link: any;
  setSelectedProject: (name: string | null) => void;
};

export const ProjectLink: FC<ProjectLinkProps> = (props) => {
  const { setSelectedProject, children, name, link: Link } = props;

  const handleClick = () => {
    setSelectedProject(null);
    setTimeout(() => {
      setSelectedProject(name);
    }, 250);
  };

  return (
    <Button
      asChild
      onClick={handleClick}
      className="flex p-1 rounded-xl cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100 pl-2 bg-transparent"
    >
      <Link>
        {children}
        <div className="flex overflow-clip place-items-center justify-between w-full">
          <p className="text-inherit truncate whitespace-nowrap tracking-wide">
            {name}
          </p>
          <ChevronRightIcon className="stroke-inherit stroke-[0.75] min-w-7 w-7" />
        </div>
      </Link>
    </Button>
  );
};
