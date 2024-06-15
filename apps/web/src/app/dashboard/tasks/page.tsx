import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { Separator } from "@repo/ui/components/ui/separator";
import { api } from "@repo/backend/convex/_generated/api";
import { KanbanBoard } from "@/components/tasks/Kanban";
import { TableView } from "@/components/tasks/Table";
import { ListView } from "@/components/tasks/List";
import { preloadQuery } from "convex/nextjs";
import { getAuthToken } from "@/lib/auth";
import {
  AlignVerticalDistributeStart,
  AlignStartHorizontal,
  Table,
} from "lucide-react";
import {
  TabsContent,
  TabsTrigger,
  TabsList,
  Tabs,
} from "@repo/ui/components/ui/tabs";

export default async function TasksPage() {
  const token = await getAuthToken();
  const tasks = await preloadQuery(api.notes.getAllActionItems, {}, { token });

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.20))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 overflow-y-auto">
      <div className="mx-auto flex justify-between w-full max-w-[80rem] gap-2">
        <h1 className="text-3xl font-medium">Tasks</h1>

        <CreateTaskModal />
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
              <Table className="mr-2 h-4 w-4" />
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
            <TableView preloadedTasks={tasks} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
