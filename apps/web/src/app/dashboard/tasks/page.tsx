import { Separator } from "@repo/ui/components/ui/separator";
import { KanbanBoard } from "@/app/dashboard/tasks/Kanban";
import { TableView } from "@/app/dashboard/tasks/Table";
import { ListView } from "@/app/dashboard/tasks/List";
import {
  AlignVerticalDistributeStart,
  AlignStartHorizontal,
  Grid3X3
} from "lucide-react";

import {
  TabsContent,
  TabsTrigger,
  TabsList,
  Tabs,
} from "@repo/ui/components/ui/tabs";

export default function TasksPage() {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.20))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-[80rem] gap-2">
        <h1 className="text-3xl font-semibold">Task lists</h1>
      </div>
      <div className="mx-auto w-full max-w-[80rem]">
        <Tabs defaultValue="kanban">
          <TabsList className="grid grid-cols-3 w-[300px] border">
            <TabsTrigger value="kanban">
              <AlignStartHorizontal className="mr-2 h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="list">
              <AlignVerticalDistributeStart className="mr-2 h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="table">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Table
            </TabsTrigger>
          </TabsList>

          <Separator className="mt-2" />

          <TabsContent value="kanban" className="">
            <KanbanBoard />
          </TabsContent>
          <TabsContent value="list" className="">
            <ListView />
          </TabsContent>
          <TabsContent value="table">
            <TableView />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
