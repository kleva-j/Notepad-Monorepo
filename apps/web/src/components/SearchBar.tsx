import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@repo/ui/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <MagnifyingGlassIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-transparent pl-8 md:w-[200px] lg:w-[336px] dark:border-neutral-800"
      />
    </div>
  );
};
