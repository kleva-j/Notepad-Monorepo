import { Separator } from "@repo/ui/components/ui/separator";
import { TasksForm } from "@/components/settings/TasksForm";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tasks</h3>
        <p className="text-sm text-muted-foreground">
          Modify your tasks layout settings. Set your preferred task layout and
          the number of columns.
        </p>
      </div>
      <Separator />
      <TasksForm />
    </div>
  );
}
