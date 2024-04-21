import { Button } from "@repo/ui/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/icons/Logo";

export const Header = () => {
  return (
    <header className="relative w-full py-7">
      <div className="container flex flex-wrap items-center justify-between shrink-0 group">
        <Logo />

        <div className="flex flex-row gap-x-4">
          <Button variant="default" className="rounded-full">
            Sign In
          </Button>
          <ModeToggle variant="ghost" className="rounded-full" />
        </div>
      </div>
    </header>
  );
};
