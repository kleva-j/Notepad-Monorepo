import { type PropsWithChildren, type FC } from "react";

import { Button } from "@repo/ui/components/ui/button";

type NavLinkProps = PropsWithChildren & { name: string; link: any };

export const NavLink: FC<NavLinkProps> = ({ name, link: Link, children }) => {
  return (
    <Button
      asChild
      className="flex p-1 justify-start rounded-sm cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100 bg-transparent pl-1.5"
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
