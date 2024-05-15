import { Separator } from "@repo/ui/components/ui/separator";
import { KanbanBoard } from "@/app/dashboard/tasks/Kanban";
import { ListView } from "@/app/dashboard/tasks/List";

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
          <TabsList className="grid grid-cols-2 w-[200px] border">
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>

          <Separator className="mt-2" />

          <TabsContent value="kanban" className="">
            <KanbanBoard />
          </TabsContent>
          <TabsContent value="list" className="">
            <ListView />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
