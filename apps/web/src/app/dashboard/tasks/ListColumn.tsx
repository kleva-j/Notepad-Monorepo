"use client";

import { Separator } from "@repo/ui/components/ui/separator";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { ListCard } from "@/app/dashboard/tasks/ListCard";
import { useMemo, useState, useCallback } from "react";
import { Badge } from "@repo/ui/components/ui/badge";
import { ChevronUp, PlusIcon } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { motion } from "framer-motion";

import {
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  Table,
} from "@repo/ui/components/ui/table";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible,
} from "@repo/ui/components/ui/collapsible";

type ColumnProps = {
  title: string;
  tasks: any[];
  accentColor?: string;
};

const MotionChevron = motion(ChevronUp);

export const ListColumn = (props: ColumnProps) => {
  const { title, tasks, accentColor = "bg-gray-500" } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState(
    tasks.map((task) => ({ idx: task.id, checked: false }))
  );

  const _allChecked = useMemo(() => {
    return data.every((d) => d.checked);
  }, [data]);

  const handleCheckedChange = useCallback((idx: string) => {
    setData((prevData) =>
      prevData.map((d) => (d.idx === idx ? { ...d, checked: !d.checked } : d))
    );
  }, []);

  const handleCheckAll = () => {
    setData((prevData) =>
      prevData.map((d) => ({ ...d, checked: !_allChecked }))
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between px-4 py-2 gap-x-4 rounded bg-neutral-200 hover:bg-neutral-300/70 dark:bg-neutral-800 dark:hover:bg-neutral-800/70 cursor-pointer transition-colors duration-200">
        <CollapsibleTrigger asChild>
          <div className="flex items-center flex-1">
            <MotionChevron
              variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
              animate={isOpen ? "open" : "closed"}
              className="h-4 w-4"
            />
            <Separator
              className={cn("h-4 w-[3px] mx-4 rounded", accentColor)}
              orientation="vertical"
            />
            <h4 className="text-sm font-semibold mr-2">{title}</h4>
            <Badge className="rounded-sm px-1.5" variant="secondary">
              {tasks.length}
            </Badge>
          </div>
        </CollapsibleTrigger>
        <PlusIcon className="h-4 w-4 ml-auto" />
      </div>

      <CollapsibleContent className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  className="relative top-[2px]"
                  checked={_allChecked}
                  onCheckedChange={handleCheckAll}
                />
              </TableHead>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ idx, checked }, i) => {
              return (
                <ListCard
                  key={idx}
                  checked={checked}
                  onCheckChange={handleCheckedChange}
                  {...tasks[i]}
                />
              );
            })}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  );
};
