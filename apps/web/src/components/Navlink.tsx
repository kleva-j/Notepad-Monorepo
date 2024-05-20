import { type PropsWithChildren, type FC } from "react";

import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@repo/ui/lib/utils";

type NavLinkProps = PropsWithChildren & {
  name: string;
  link: any;
  isActive?: boolean;
};

export const NavLink: FC<NavLinkProps> = (props) => {
  const { name, link: Link, children, isActive } = props;
  return (
    <Button
      asChild
      className={cn("flex p-1 justify-start rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100 bg-transparent pl-1.5", { "stroke-white text-neutral-100 bg-neutral-700/30": isActive })}
    >
      <Link>
        {children}
        <p className="text-inherit overflow-clip whitespace-nowrap tracking-wide">
          {name}
        </p>
      </Link>
    </Button>
  );
};
